import { CartModel, ICartModel } from "../4-models/cart-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import { IProductInCartModel, ProductInCartModel } from "../4-models/product-in-cart-model";
import { UserModel } from "../4-models/user-model";
import productsLogic from "./products-logic";


async function getLatestCartByUser(userId: string): Promise<ICartModel> {
    const latestCart = (await CartModel.find({ userId: userId }, null, { sort: { creationDate: -1 } }).exec())[0];

    if (!latestCart) {
        throw new ResourceNotFoundError(userId);
    }
    return latestCart;
}

async function getCartWithItems(cartId: string): Promise<IProductInCartModel[]> {
    const cart = await ProductInCartModel.find({ cartId: cartId }).populate("product", "-_id").exec();
    

    // if (!cart) {
    //     throw new ResourceNotFoundError(cartId);
    // }
    return cart;
}

async function createCart(userIdString: string): Promise<ICartModel> {
    const userId = (await UserModel.findById(userIdString).exec())._id;
    console.log(await UserModel.findById(userIdString).exec());

    if (!userId) {
        throw new ResourceNotFoundError(userId);
    }

    const now = new Date().toLocaleString();
    const cart = new CartModel({ userId: userId, creationDate: now, cartOpen: true });

    const errors = cart.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return cart.save();
}

async function closeCart(_id: string): Promise<void> {
    const cart = await CartModel.findById(_id);
    if (!cart) {
        throw new ResourceNotFoundError(_id);
    }
    cart.cartOpen = false;
    await CartModel.findByIdAndUpdate(_id, cart, { returnOriginal: false });
}

async function deleteCart(_id: string): Promise<void> {
    const deletedCart = await CartModel.findByIdAndDelete(_id);
    if (!deletedCart) {
        throw new ResourceNotFoundError(_id);
    }
}

async function addProduct(productId: string, cartId: string, amount: number): Promise<IProductInCartModel> {
    const productPrice = (await productsLogic.getOneProduct(productId)).productPrice;
    const productInCart = new ProductInCartModel({ productId: productId, amount: amount, totalProductPrice: productPrice * amount, cartId: cartId });

    const errors = productInCart.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    return productInCart.save();
}

async function updateProduct(product: IProductInCartModel): Promise<IProductInCartModel> {
    const productPrice = (await productsLogic.getOneProduct(product.productId)).productPrice;
    product.totalProductPrice = productPrice * product.amount;

    const errors = product.validateSync();
    if (errors) {
        throw new ValidationError(errors.message);
    }
    const updatedProduct = await ProductInCartModel.findByIdAndUpdate(product._id, product, { returnOriginal: false });
    if (!updatedProduct) {
        throw new ResourceNotFoundError(product._id);
    }
    return updatedProduct;
}

async function deleteProduct(_id: string): Promise<void> {
    const deletedProduct = await ProductInCartModel.findByIdAndDelete(_id);
    if (!deletedProduct) {
        throw new ResourceNotFoundError(_id);
    }
}

export default {
    getLatestCartByUser,
    getCartWithItems,
    createCart,
    closeCart,
    deleteCart,
    addProduct,
    updateProduct,
    deleteProduct

}