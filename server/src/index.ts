import "reflect-metadata";
import { createKoaServer, Action, BadRequestError } from "routing-controllers";
import setupDb from "./db";
import CommentController from './comments/controller';
import EventController from './events/controller';
import TicketController from './tickets/controller';
import UserController from './users/controller';
import LoginController from './logins/controller';
import { verify } from "./jwt";
import User from './users/entity';

const port = process.env.PORT || 4000;

const app = createKoaServer({
  cors: true,
  controllers: [
    CommentController,
    EventController,
    TicketController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      try {
        return !!(token && verify(token));
      } catch (e) {
        throw new BadRequestError(e);
      }
    }

    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ");

      if (token) {
        const { id } = verify(token);
        return User.findOne(id);
      }
    }
    return undefined;
  }
});

setupDb()
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error(err));
