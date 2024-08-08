import iPaymentUseCases from "./iPaymentUseCases";
import IPaymentRepository from "../../domain/repositories/iPaymentRepository";
import { Payment } from "../../domain/entities/payment";
import IPaymentQueue from "../../domain/repositories/iPaymentQueue";

class PaymentUseCases implements iPaymentUseCases {
    constructor (private paymentRepository: IPaymentRepository, private paymentQueue: IPaymentQueue) {}
    
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
        paymentInfo.status = 1
        let payment = await this.paymentRepository.create(paymentInfo)
        if (payment) {
            paymentInfo.status = 1
            this.paymentQueue.sendToQueue(JSON.stringify(paymentInfo), process.env.APPROVED_PAYMENT || 'pagamento_aprovado')
        } else {
            paymentInfo.status = 4
            this.paymentQueue.sendToQueue(JSON.stringify(paymentInfo), process.env.DISAPPROVED_PAYMENT || 'pagamento_reprovado')
        }
        return true
    }
}

export default PaymentUseCases