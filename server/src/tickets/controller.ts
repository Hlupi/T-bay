import { JsonController, Get, Param, Body, Post, HttpCode, Authorized, CurrentUser, ForbiddenError, NotFoundError, Put, Delete } from 'routing-controllers'
import Ticket from './entity'
import User from '../users/entity';
import Comment from '../comments/entity'
import { Risk } from './risk'

@JsonController()   
export default class TicketController {

    @Get('/events/:event_id/tickets/:id([0-9]+)')
    async getTicket(
        @Param('id') id: number,
        @Param('event_id') ed: number
    ) {
        const ticket = await Ticket.findOne(id)
        const tickets = await Ticket.find({where: {event: ed}})
        const comments = await Comment.find({where: {ticket: id}})
        const ticketsByAuthor = await Ticket.find({where: {user: ticket!['user'].id}})
        const risk = Risk(comments, tickets, ticket, ticketsByAuthor)
        const allInfo =  { ...ticket, risk }
        return allInfo 
    }

    @Get('/events/:event_id/tickets')
    async allTickets(
      @Param('event_id') id: number
    ) {
        const tickets = await Ticket.find({where: {event: id}})
        const ticketsWithRisk = await Promise.all(tickets.map(async ticket => {
            const comments = await Comment.find({where: {ticket: ticket.id}})
            const ticketsByAuthor = await Ticket.find({where: {user: ticket.user.id}})
            const risk = Risk(comments, tickets, ticket, ticketsByAuthor)
            return { ...ticket, risk }
        }))
        return { tickets: ticketsWithRisk } 
    }

    @Authorized()
    @Post('/tickets')
    @HttpCode(201)
        async createTicket(
        @CurrentUser() user: User,
        @Body() ticket: Ticket
    ) {
        if(user instanceof User) ticket.user = user

        const newTicket = await ticket.save()
        const tickets = await Ticket.find({where: {event: ticket.event.id}})
        const ticketsByAuthor = await Ticket.find({where: {user: ticket.user.id}})
        const risk = Risk([], tickets, newTicket, ticketsByAuthor)
        return {...newTicket, risk}
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

    @Authorized()
    @Delete('/tickets/:id([0-9]+)')
    async deleteEvent(
        @CurrentUser() user: User,
        @Param('id') id: number
    ) {
        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError('Ticket not found!')

        if(!user.admin) throw new ForbiddenError("Only admins may delete events.")
        
        return Ticket.remove(ticket)
    }
} 