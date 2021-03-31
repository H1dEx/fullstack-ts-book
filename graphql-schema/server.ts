import express from 'express';
import { ApolloServer, makeExecutableSchema, PubSub } from 'apollo-server-express';
import { createServer } from 'http'
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app = express();
const pubsub = new PubSub();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema, context: ({ req, res }: any) => ({ req, res, pubsub }) })

apolloServer.applyMiddleware({ app, cors: false });
const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 2000 }, () => {
    console.log('GraphQL server has been started ' + apolloServer.graphqlPath);
    console.log('GraphQL subs server ready ' + apolloServer.subscriptionsPath);
})