import { JsonController, Get, Param, Body, Post, HttpCode, Authorized, CurrentUser, ForbiddenError, NotFoundError, Put } from 'routing-controllers'
import Ticket from './entity'
import User from '../users/entity';

@JsonController()
export default class TicketController {

    @Get('/tickets/:id([0-9]+)')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id)
    }

    @Get('/events/tickets/:event_id')
    async allTickets(
      @Param('event_id') id: number
    ) {
        const tickets = await Ticket.find({where: {event: id}})
        return { tickets }
    }

    @Get('/tickets-all')
    async allUserTickets() {
        const allTickets = await Ticket.find()
        return { allTickets }
    }

    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
        async createTicket(
        @CurrentUser() user: User,
        @Body() ticket: Ticket
    ) {
        if(user instanceof User) ticket.user = user

        return ticket.save()
    }

    @Authorized()
    @Put('/tickets/:id([0-9]+)')
    async updateTicket(
        @CurrentUser() user: User,
        @Param('id') id: number,
        @Body() update: Partial<Ticket>
    ){
        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError("Can't find ticket")

        if(ticket.user.id !== user.id) throw new ForbiddenError("You are not the author of this ticket")

        return Ticket.merge(ticket, update).save()
    }

} 