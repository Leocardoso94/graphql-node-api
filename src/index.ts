import * as http from 'http';
import app from './app';
import models from './models';

import { normalizePort, onError, onListening } from './utils/utils';

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || 3000);

models.sequelize.sync()
  .then(() => {
    server.listen(port);
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  });
