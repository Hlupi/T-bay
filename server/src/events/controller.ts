import { JsonController, Get, Param, Body, Post, HttpCode, CurrentUser, Authorized } from 'routing-controllers'
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
        
        
        return event.save()
    }
}