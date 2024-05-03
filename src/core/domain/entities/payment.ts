import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    date: Date

    @Column()
    status: string

    @Column()
    order: number

    constructor (date: Date, status: string, order: number) {
        this.date = date
        this.status = status
        this.order = order
    }
}