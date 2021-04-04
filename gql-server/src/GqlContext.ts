import {PubSub} from "apollo-server-express";
import {Request, Response} from 'express';

export interface GqlContext {
  req: Request,
  res: Response,
  pubSub: PubSub
}