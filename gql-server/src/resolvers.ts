import {IResolvers} from "apollo-server-express";
import {Todos, Users} from "./bd";
import {v4} from "uuid";
import {GqlContext} from "./GqlContext";

export type User = {
  id: string,
  name: string,
  description?: string,
}

export type Todo = {
  id: string,
  title: string,
  description?: string
}

const NEW_TODO = 'NEW TODO';

export const resolvers: IResolvers = {
  Query: {
    getUser: async (_parent: any, args: { id: string }): Promise<User | undefined> => {
      return Users.find(({id}) => id == args.id)
    },
    getTodos: async (): Promise<Todo[]> => {
      console.log('running getTODOS');
      return Todos;
    }
  },

  Mutation: {
    addTodo: async (_parent: any, args: { title: string, description?: string }, {pubSub}: GqlContext): Promise<Todo> => {
      const newTodo = {
        id: v4(),
        title: args.title,
        description: args.description
      }
      Todos.push(newTodo);
      pubSub.publish(NEW_TODO, {newTodo})
      return Todos[Todos.length - 1]
    }
  },

  Subscription: {
    newTodo: {
      subscribe: (_parent: any, _args: null, {pubSub}: GqlContext) => pubSub.asyncIterator(NEW_TODO)
    }
  }
}