import express from "express";
import {createServer} from 'http';
import {ApolloServer, makeExecutableSchema, PubSub} from "apollo-server-express";
import {typeDefs} from "./typeDefs";
import {resolvers} from "./resolvers";
import {log} from "./Logger";
import {applyMiddleware} from "graphql-middleware";

const app = express();
const pubSub = new PubSub();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const schemaWithMiddleware = applyMiddleware(schema, log)

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({req, res}) => ({req, res, pubSub})
})
apolloServer.applyMiddleware({app, cors: false});

const httpServer = createServer(app);

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(2000, () => {
  console.log('Server has been started')
})