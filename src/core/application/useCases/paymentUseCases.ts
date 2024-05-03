import iPaymentUseCases from "./iPaymentUseCases";
import IPaymentRepository from "../../domain/repositories/iPaymentRepository";
import { Payment } from "../../domain/entities/payment";

class PaymentUseCases implements iPaymentUseCases {
    constructor (private paymentRepository: IPaymentRepository) {}
    
    async getStatus(id: number): Promise<String | boolean> {
        let payment = await this.paymentRepository.findById(id)
        if (payment) {
            return payment.status
        }

        return false
    }

    async find(): Promise<Payment[] | []> {
        return await this.paymentRepository.find()
    }

    async pay(paymentInfo: any): Promise<boolean> {
        paymentInfo.status = 'paid'
        let payment = await this.paymentRepository.create(paymentInfo)
        if (payment) {
            return true
        }
        return false
    }
}

export default PaymentUseCases