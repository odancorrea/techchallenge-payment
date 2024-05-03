import { Request, Response } from 'express'
import PaymentUseCases from '../../../core/application/useCases/paymentUseCases'
import PaymentRepository from '../../driver/infra/repositories/paymentRepository'

class PaymentController {
    async getStatus(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository)
        const result = await paymentUseCase.getStatus(parseInt(req.params.id))
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async find(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository)
        const result = await paymentUseCase.find()
        result ? res.status(200).send(result) : res.status(404).send('not found')
    }

    async pay(req: Request, res: Response) {
        const paymentRepository = new PaymentRepository()
        const paymentUseCase = new PaymentUseCases(paymentRepository)
        await paymentUseCase.pay(req.body)
        res.status(200).send('ok')
    }
}

export default new PaymentController()