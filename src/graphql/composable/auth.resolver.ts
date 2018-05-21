import { ComposableResolver } from './composable.resolver';
import { ResolverContext } from '../../Interfaces/ResolverContextInterface';
import { GraphQLFieldResolver } from 'graphql';

export const authResolver: ComposableResolver<any, ResolverContext> = (
  resolver: GraphQLFieldResolver<any, ResolverContext>,
): GraphQLFieldResolver<any, ResolverContext> => (
  parent,
  args,
  context,
  info) => {
  if (context.user || context.authorization) return resolver(parent, args, context, info);

  throw new Error('Unauthorized! Token not provided!');

};
