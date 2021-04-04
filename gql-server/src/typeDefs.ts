import {gql} from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    description: String
  }
  
  type Todo {
    id: ID!
    title: String!
    description: String
  }
  
  type Query {
    getTodos: [Todo!]
    getUser(id: ID!): User
  }
  
  type Mutation {
    addTodo(title: String!, description: String): Todo
  }
  
  type Subscription {
    newTodo: Todo! 
  }
`;