import { GraphQLResolveInfo } from 'graphql';
import { DbConnectionInterface } from '../../../Interfaces/DbConnectionInterface';
import { Transaction } from 'sequelize';
import { CommentInstance } from '../../../models/CommentModel';

const checkComment = (comment, id) => {
  if (!comment) throw new Error(`Comment with id ${id} not found`);
};



export const commentResolvers = {
  Comment: {
    user: (
      comment,
      args,
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.User.findById(comment.get('user')),
    post: (
      comment,
      args,
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.Post.findById(comment.get('post')),
  },
  Query: {
    commentsByPost: (
      parent,
      { postId, first = 10, offset = 0 },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => db.Comment
      .findAll({ offset, limit: first, where: { post: postId } }),
  },
  Mutation: {
    createComment: async (
      parent,
      { input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();
      return db.Comment.create(input, { transaction });
    },
    updateComment: async (
      parent,
      { id, input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();
      const comment: CommentInstance = await db.Comment.findById(id);
      checkComment(comment, id);

      return comment.update(input, { transaction });
    },
    deleteComment: async (
      parent,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      const transaction: Transaction = await db.sequelize.transaction();
      const comment: CommentInstance = await db.Comment.findById(id);
      checkComment(comment, id);

      const res = comment.destroy({ transaction });

      return !!res;
    },
  },
};
