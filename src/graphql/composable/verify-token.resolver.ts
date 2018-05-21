import * as jwt from 'jsonwebtoken';
import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../Interfaces/ResolverContextInterface';
import { GraphQLFieldResolver } from 'graphql';
import { JWT_SECRET } from '../../utils/utils';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> = (
  resolver: GraphQLFieldResolver<any, ResolverContext>,
): GraphQLFieldResolver<any, ResolverContext> => (
  parent,
  args,
  context: ResolverContext,
  info,
  ) => {
  const token: string = context.authorization ? context.authorization.split(' ')[1] : null;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) resolver(parent, args, context, info);

    throw new Error(err.name + ': ' + err.message);
  });
};
