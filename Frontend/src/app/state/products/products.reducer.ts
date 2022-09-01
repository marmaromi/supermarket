// import { addProductToCart, getAllProductsInCart, getAllProductsInCartFailure, getAllProductsInCartSuccess, removeProductFromCart, updateProductInCart } from "./products.actions";
// import { ProductsInCartModel } from "src/app/models/products-in-cart-model";

// export interface ProductsState {
//     productsInCart: ProductsInCartModel[];
//     error: string;
//     status: "pending" | "loading" | "success" | "error";
// }

// export const initialState: ProductsState = {
//     productsInCart: [],
//     error: null,
//     status: "pending"
// };

// export const productsReducer = createReducer(
//     initialState,
//     on(getAllProductsInCart, state => ({ ...state, status: "loading" })),

//     on(getAllProductsInCartSuccess, (state, { productsInCart }) => ({
//         ...state,
//         productsInCart: productsInCart,
//         error: null,
//         status: "success"
//     })),

//     on(getAllProductsInCartFailure, (state, { error }) => ({
//         ...state,
//         error: error,
//         status: "error"
//     })),

//     on(addProductToCart, (state, { product }) => ({
//         ...state,
//         productsInCart: [...state.productsInCart, product]
//     })),

//     on(updateProductInCart, (state, { product }) => ({
//         ...state,
//         productsInCart: state.productsInCart.map(p => p._id === product._id ? product : p)
//     })),

//     on(removeProductFromCart, (state, { id }) => ({
//         ...state,
//         productsInCart: state.productsInCart.filter(product => product._id !== id)
//     }))

// );