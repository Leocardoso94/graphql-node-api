import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
  {
    id: 1,
    name: 'Jon',
    email: 'email',
  },
  {
    id: 1,
    name: 'Jon',
    email: 'email',
  },
];

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }
`;

const resolvers = {
  Query: {
    allUsers: () => users,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
