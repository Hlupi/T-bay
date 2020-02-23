import { JsonController, Get, Param, Body, Post, HttpCode, CurrentUser, Authorized, Put, NotFoundError, ForbiddenError, Delete } from 'routing-controllers'
import Event from './entity'
import User from '../users/entity';

@JsonController()
export default class EventController {
    
    @Get('/events/:id([0-9]+)')
    getEvent(
        @Param('id') id: number
    ) {
        return Event.findOne(id)
    }

    @Get('/events')
    async allEvents() {
        const events = await Event.find()
        return { events }
    }

    @Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
        @CurrentUser() user: User,
        @Body() event: Event,
    ) {
        if(user instanceof User) event.user = user
        const newEvent = await event.save()

        return newEvent
    }

    @Authorized()
    @Put('/events/:id([0-9]+)')
    async updateEvent(
        @CurrentUser() user: User,
        @Param('id') id: number,
        @Body() update: Partial<Event>
    ) {
        const event = await Event.findOne(id)
        if(!event) throw new NotFoundError("Can't find event")

        if(!user.admin) throw new ForbiddenError("Only admins may edit events.")

        return Event.merge(event, update).save()
    }

    @Authorized()
    @Delete('/events/:id([0-9]+)')
    async deleteEvent(
        @CurrentUser() user: User,
        @Param('id') id: number
    ) {
        const event = await Event.findOne(id)
        if(!event) throw new NotFoundError('Event not found!')

        if(!user.admin) throw new ForbiddenError("Only admins may delete events.")
        
        return Event.remove(event)
    }
}