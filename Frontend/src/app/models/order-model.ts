export class OrderModel {
    public _id: string;
    public userId: string;
    public cartId: string;
    public finalPrice: number;
    public deliveryCity: string;
    public deliveryStreet: string;
    public deliveryDate: string;
    public orderDate: string;
    public fourLastDigits: number;
}
