import { userMutations } from './resources/user/user.schema';
import { postMutations } from './resources/post/post.schema';
import { commentMutations } from './resources/comment/comment.schema';

const mutation = `
 type Mutation {
  ${commentMutations}
  ${postMutations}
  ${userMutations}
 }
`;

export {
  mutation,
};
