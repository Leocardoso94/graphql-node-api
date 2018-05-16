import { makeExecutableSchema } from 'graphql-tools';
import { query } from './query';
import { mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comment/comment.schema';

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    query,
    mutation,
    commentTypes,
    postTypes,
    userTypes,
  ],
});
