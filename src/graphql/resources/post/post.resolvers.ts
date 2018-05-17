import { DbConnectionInterface } from '../../../Interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { PostIntance } from '../../../models/PostModel';
import { Transaction } from 'sequelize';

const checkPost = (post, id) => {
  if (!post) throw new Error(`Post with id ${id} not found`);
};


export const postResolvers = {
  Post: {
    author: (
      post,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.User.findById(post.get('author')),
    comments: (
      post,
      { first = 10, offset = 0 },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.Comment.findAll({
      offset,
      where: { post: post.get('id') },
      limit: first,
    }),
  },
  Query: {
    posts: (
      parent,
      { first = 10, offset = 0 },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.Post.findAll({ offset, limit: first }),
    post: async (
      parent,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const post: PostIntance = await db.Post.findById(id);
      checkPost(post, id);
      return post;
    },
  },
  Mutation: {
    createPost: async (
      parent,
      { input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();

      return db.Post.create(input, { transaction });
    },
    updatePost: async (
      parent,
      { id, input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();
      const post: PostIntance = await db.Post.findById(Number(id));
      checkPost(post, id);

      return post.update(input, { transaction });
    },
    deletePost: async (
      parent,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();
      const post: PostIntance = await db.Post.findById(Number(id));
      checkPost(post, id);

      const res =  post.destroy({ transaction });

      return !!res;
    },
  },
};
