import { IResolvers } from 'apollo-server-express';
import { v4 } from 'uuid';
import { todos } from './db';
import { GqlContext } from "./GqlContext";

const NEW_TODO = "NEW TODO"

interface User {
    id: string;
    username: string;
    description?: string;
}

interface Todo {
    id: string;
    title: string;
    description?: string;
}

const resolvers: IResolvers = {
    Query: {
        getUser: async (
            parent: any,
            args: {
                id: string
            },
            ctx: GqlContext,
            info: any
        ): Promise<User> => {
            return {
                id: v4(),
                username: 'testuser',
                description: 'wowow'
            }
        },

        getTodos: async (
            parent: any,
            args: null,
            ctx: GqlContext,
            info: any
        ): Promise<Todo[]> => {
            return todos
        }
    },
    Mutation: {
        addTodo: async (
            parent: any,
            args: {
                title: string;
                description: string;
            },
            { pubsub }: GqlContext,
            info: any
        ): Promise<Todo> => {
            const newTodo = { id: v4(), title: args.title, description: args.description };
            todos.push(newTodo);
            pubsub.publish(NEW_TODO, {newTodo})
            return todos[todos.length - 1]
        }
    },
    Subscription: {
        newTodo: {
            subscribe: (parent, args: null, {pubsub}: GqlContext) => pubsub.asyncIterator(NEW_TODO)
        }
    }
}

export default resolvers;