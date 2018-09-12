import { JsonController, Get, Param, Body, Post, HttpCode, Authorized, CurrentUser } from 'routing-controllers'
import Comment from './entity'
import User from '../users/entity';

@JsonController()
export default class CommentController {

    @Get('/tickets/comments/:ticket_id')
    async getComments(
        @Param('ticket_id') id: number
    ) {
        const comments = await Comment.find({where: {ticket: id}})
        return { comments }
    }

    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    }

    @Authorized()
    @Post('/comments')
    @HttpCode(201)
        async createComment(
        @CurrentUser() user: User,
        @Body() comment: Comment
    ) {  
        if (user instanceof User) comment.user = user
        return comment.save()
    }
}