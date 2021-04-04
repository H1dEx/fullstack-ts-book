import faker from "faker";
import {testGraphQLQuery} from "./testgraphQLQuery";
import {addMockFunctionsToSchema} from 'apollo-server-express';
import {typeDefs} from "./typeDefs"
import {resolvers} from "./resolvers";
import {makeExecutableSchema} from "graphql-tools";

describe("Testing getting a user", () => {
  const GetUser = `
    query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        name
      }
    }
  `

  it("gets the desired user", async () => {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    const userId = faker.random.alphaNumeric(20);
    const name = faker.internet.userName();

    const mocks = {
      User: () => ({
        id: userId,
        name
      })
    };
    addMockFunctionsToSchema({schema, mocks})

    const queryResponse = await testGraphQLQuery({
      schema,
      source: GetUser,
      variableValues: {
        id: faker.random.alphaNumeric(20)
      }
    })

    const response = queryResponse.data ? queryResponse.data.getUser : null;
    console.log('RESULT', response);

    expect(response).toEqual({
      id: userId,
      name
    })
  })
})