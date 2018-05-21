import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { query } from './query';
import { mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comment/comment.schema';
import { commentResolvers } from './resources/comment/comment.resolvers';
import { userResolvers } from './resources/user/user.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { tokenTypes } from './resources/token/token.schema';
import { tokenResolvers } from './resources/token/token.resolver';

const resolvers = merge(
  userResolvers,
  postResolvers,
  tokenResolvers,
  commentResolvers,
);

const schemaDefinition = `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  resolvers,
  typeDefs: [
    schemaDefinition,
    query,
    mutation,
    commentTypes,
    postTypes,
    tokenTypes,
    userTypes,
  ],
});
