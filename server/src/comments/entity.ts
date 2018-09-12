import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsString } from '../../node_modules/class-validator';
import { Exclude } from "../../node_modules/class-transformer";
import Ticket from '../tickets/entity';
import User from '../users/entity';


@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable: false})
  text: string


  // @Exclude({toPlainOnly:true})
  @ManyToOne(_ => User, user => user.comments, {eager:true})
  user: User

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

}