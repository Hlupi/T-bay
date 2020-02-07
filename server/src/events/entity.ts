import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { IsString, IsUrl } from '../../node_modules/class-validator';
import { Exclude } from "../../node_modules/class-transformer";
import Ticket from '../tickets/entity';
import User from '../users/entity';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsString()
  @Column('text')
  description: string

  @IsUrl()
  @Column('text')
  picture: string

  @Column('text')
  starts: string

  @Column('text')
  ends: string


  @OneToMany(_ => Ticket, ticket => ticket.event)
  tickets: Ticket[]

  @Exclude({toPlainOnly:true})
  @ManyToOne(_ => User, user => user.events)
  user: User

}