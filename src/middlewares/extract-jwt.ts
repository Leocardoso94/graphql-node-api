import * as jwt from 'jsonwebtoken';
import models from './../models';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../utils/utils';
import { UserInstance } from '../models/UserModel';

export const extractJwt = (): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization: string = req.get('authorization');
  const token: string = authorization ? authorization.split(' ')[1] : null;

  req['context'] = { authorization };

  if (!token) return next();

  jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
    if (err) return next();

    const user: UserInstance = await models.User.findById(decoded.sub, {
      attributes: ['id', 'email'],
    });

    if (user) {
      req['context']['user'] = {
        id:user.get('id'),
        email: user.get('email'),
      };
    }

    return next();
  });
};
