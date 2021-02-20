import * as http from 'http';

import * as env from 'dotenv';
env.config();

import DiscordClient from './Discord/client';
import expressApp from './server';

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(expressApp);
expressApp.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

DiscordClient.login(process.env.TOKEN);

function normalizePort(val: string) {
  const portToNormalize = parseInt(val, 10);
  if (isNaN(portToNormalize)) {
    return val;
  }
  if (portToNormalize >= 0) {
    return portToNormalize;
  }
  return false;
}

function onError(error: string) {
  console.error(error);
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
