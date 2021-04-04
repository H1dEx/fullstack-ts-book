import {v4} from "uuid";
import {Todo, User} from "./resolvers";


export const Users: User[] = [
  {
    id: v4(),
    name: 'John',
    description: 'developer'
  },
  {
    id: v4(),
    name: 'Fedor',
    description: 'frontender'
  },
  {
    id: v4(),
    name: 'Yan',
    description: 'businessman'
  }
]

export const Todos: Todo[] = [
  {
    id: v4(),
    title: 'make something cool!',
    description: 'and make it again!'
  },
  {
    id: v4(),
    title: 'Explore graphql'
  }, {
    id: v4(),
    title: 'ANother cool thing',
    description: 'Ye chek description'
  }
]