import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";  

@Entity({name: 'turns'})
export class Turn {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    //date: string
    date: Date

    @Column()
    time: string

    @Column()
    userId: number

    @Column({type: "enum", enum: ["cancelled","active"],
        default: "active"
    })
    status: string

    @ManyToOne(() => User, (user) => user.id)
    user: User
}