import { JsonController, Post, Param, Get, Body, Authorized, BadRequestError } from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() data: User
  ) {
    const {password, ...rest} = data
    const alreadyExists =  await User.findOne({ where: { email: data.email } })
    if (alreadyExists) throw new BadRequestError("A user with this email already exists");
    const entity = User.create(rest)
    await entity.setPassword(password)
    const user = await entity.save()
    return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }
}
