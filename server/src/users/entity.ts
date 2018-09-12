import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsString, IsEmail, MinLength } from "../../node_modules/class-validator";
import { Exclude } from "../../node_modules/class-transformer";
import * as bcrypt from "bcrypt";
import Event from '../events/entity';
import Ticket from '../tickets/entity';
import Comment from '../comments/entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  firstName: string;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  lastName: string;

  @IsEmail()
  @Column("text", { nullable: false })
  email: string;

  @IsString()
  @Column("text", { nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(_ => Event, event => event.user)
  events: Event[]

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]

  @OneToMany(_ => Comment, comment => comment.user)
  comments: Comment[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}
