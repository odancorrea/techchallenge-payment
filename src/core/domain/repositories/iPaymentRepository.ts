import { Payment } from "../entities/payment";

export default interface IPaymentRepository {
    findById(id: number): Promise<Payment | undefined>,
    create(payment: any): Promise<boolean>,
    find(): Promise<Payment[] | []>
}