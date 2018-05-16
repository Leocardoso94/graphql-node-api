import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import models from './models';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware() {
    this.express.use('/graphql',
                     (req, res, next) => {
                       req['context'] = { db: models };
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
