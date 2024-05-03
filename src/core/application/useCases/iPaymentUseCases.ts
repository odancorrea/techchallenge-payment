import { Payment } from "../../domain/entities/payment";

export default interface iPaymentUseCases {
    getStatus(id: number): Promise<String | boolean>,
    pay(paymentInfo: any): Promise<boolean>,
    find(): Promise<Payment[] | []>
}