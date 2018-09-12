import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm'
import { IsString, IsUrl } from '../../node_modules/class-validator';
// import { Exclude } from "../../node_modules/class-transformer";
import Event from '../events/entity';
import Comment from '../comments/entity';
import User from '../users/entity';

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsUrl()
  @Column('text')
  picture: string

  @Column('integer')
  price: number

  @IsString()
  @Column('text')
  description: string

  @CreateDateColumn({type: "timestamp"})
  postedAt: Date


  @OneToMany(_ => Comment, comment => comment.ticket, {eager:true})
  comments: Comment[]

  // @Exclude({toPlainOnly:true})
  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  // @Exclude({toPlainOnly:true})
  @ManyToOne(_ => User, user => user.tickets, {eager:true})
  user: User

}