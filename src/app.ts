import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import models from './models';
import { extractJwt } from './middlewares/extract-jwt';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware() {
    this.express.use('/graphql',
                     extractJwt(),
                     (req, res, next) => {
                       req['context'].db = models;
                       next();
                     },
                     graphqlHTTP(req => ({
                       schema,
                       graphiql: true,
                       context: req['context'],
                     })),

    );
  }
}

export default new App().express;
