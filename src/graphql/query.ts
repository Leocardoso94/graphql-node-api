import { userQueries } from './resources/user/user.schema';
import { postQueries } from './resources/post/post.schema';
import { commentQueries } from './resources/comment/comment.schema';

const query = `
 type Query {
    ${commentQueries}
    ${postQueries}
    ${userQueries}
 }
`;


export {
  query,
};


