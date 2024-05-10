import PaymentRepository from "../../../adapter/driver/infra/repositories/paymentRepository"
import PaymentUseCases from "./paymentUseCases"

describe('PaymentUseCases', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('deve buscar o status de um payment', async () => {
        //arrange
        const payload = 1

        const mock = {
            id:1,
            date: new Date(),
            status:'paid',
            order:1
        }

        const paymentRepository = new PaymentRepository()
        paymentRepository.findById = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository)

        //act
        const paymentStatus = await paymentUseCase.getStatus(payload)

        //assert
        expect(paymentStatus).toBe('paid')
    })

    it('deve buscar todos os payments', async () => {
        //arrange
        const mock = [{
            id:1,
            date: new Date(),
            status:'paid',
            order:1
        }]

        const paymentRepository = new PaymentRepository()
        paymentRepository.find = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository)

        //act
        const payment = await paymentUseCase.find()

        //assert
        expect(Array.isArray(payment)).toBe(true)
        expect(payment.length).toBe(1)
    })

    it('deve fazer um pagamento', async () => {
        //arrange
        const payload = { order: 1 }

        const mock = true

        const paymentRepository = new PaymentRepository()
        paymentRepository.create = jest.fn().mockResolvedValue(mock)
        const paymentUseCase = new PaymentUseCases(paymentRepository)

        //act
        const payment = await paymentUseCase.pay(payload)

        //assert
        expect(payment).toBe(true)
    })
})