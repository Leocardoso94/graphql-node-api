import * as jwt from 'jsonwebtoken';
import { DbConnectionInterface } from '../../../Interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
import { JWT_SECRET } from '../../../utils/utils';

export const tokenResolvers = {
  Mutation: {
    createToken: async (
      parent,
      { email, password },
      { db }: { db: DbConnectionInterface },
    ) => {
      const user: UserInstance = await db.User.findOne({
        where: { email },
        attributes: ['id', 'password'],
      });

      const errorMessage = 'Unauthorized, wrong email or password';
      if (!user || !user.isPassword(user.get('password'), password)) throw new Error(errorMessage);

      const payload = { sub: user.get('id') };

      return {
        token: jwt.sign(payload, JWT_SECRET),
      };
    },
  },
};
