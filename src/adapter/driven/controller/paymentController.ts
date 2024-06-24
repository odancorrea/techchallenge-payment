import { Request, Response } from 'express'
import PaymentUseCases from '../../../core/application/useCases/paymentUseCases'
import PaymentRepository from '../../driver/infra/repositories/paymentRepository'
import queue from '../../driver/queue/queue'

class PaymentController {
    async getStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue)
        const result = await paymentUseCase.getStatus(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async find(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue)
        const result = await paymentUseCase.find()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async pay(queueObject: any) {
        const parsedQueueObject = JSON.parse(queueObject.content.toString())
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository, queue)
        await paymentUseCase.pay(parsedQueueObject)
    }
}

export default new PaymentController()