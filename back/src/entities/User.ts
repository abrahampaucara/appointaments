import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import { Credential } from "./Credential";
import { Turn } from "./Turn";

@Entity({name: 'users'})
export class User { 
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column()
    email: string

    @Column()
    birthdate: string

    @Column()
    nDni: string

    // @Column()
    // credentialsId: number

    @OneToOne(() => Credential, (credential) => credential.id) 
    credential: Credential

    @OneToMany(() => Turn, (turn) => turn.id)
    turns: Turn[]
}
