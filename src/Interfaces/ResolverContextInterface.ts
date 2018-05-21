import { DbConnectionInterface } from '../Interfaces/DbConnectionInterface';
import { AuthUser } from './AuthUserInterface';

export interface ResolverContext {
  db?: DbConnectionInterface;
  authorization?: string;
  user?: AuthUser;
}
