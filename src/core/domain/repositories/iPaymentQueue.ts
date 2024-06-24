export default interface IPaymentQueue {
    sendToQueue(message: string, queue: string): void
}