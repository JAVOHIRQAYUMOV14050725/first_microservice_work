import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Check(`LENGTH(password) = 6 AND password ~ '^[0-9]+$'`)
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'varchar'})
    password:string
 }
