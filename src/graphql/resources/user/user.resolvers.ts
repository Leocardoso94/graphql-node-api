import { GraphQLResolveInfo } from 'graphql';
import { DbConnectionInterface } from '../../../Interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
import { Transaction } from 'sequelize';
import { EFBIG } from 'constants';


const checkUser = (user, id) => {
  if (!user) throw new Error(`User with id ${id} not found`);
};

export const userResolvers = {
  Query: {
    users: (
      parent,
      { first = 10, offset = 0 },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo,
    ) => {
      return db.User
        .findAll({
          offset,
          limit: first,
        });
    },
    user: (
      parent,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo) => {
      return db.User
        .findById(id)
        .then((user: UserInstance) => {
          checkUser(user, id);
          return user;
        });
    },
  },
  Mutation: {
    createUser: (
      parent,
      { input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((transaction: Transaction) =>
        db.User.create(input, { transaction }));
    },
    updateUser: (
      parent,
      { id, input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((transaction: Transaction) =>
        db.User
          .findById(Number(id))
          .then((user: UserInstance) => {
            checkUser(user, id);
            return user.update(input, { transaction });
          }),
      );
    },
    updateUserPassword: (
      parent,
      { id, input },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((transaction: Transaction) =>
        db.User
          .findById(Number(id))
          .then((user: UserInstance) => {
            checkUser(user, id);
            return user
              .update(input, { transaction })
              .then((user: UserInstance) => !!user);
          }),
      );
    },
    deleteUser: (
      parent,
      { id },
      { db }: { db: DbConnectionInterface },
      info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((transaction: Transaction) =>
        db.User
          .findById(Number(id))
          .then((user: UserInstance) => {
            checkUser(user, id);
            return user
              .destroy({ transaction })
              .then(user => !!user);
          }),
      );
    },
  },
};
