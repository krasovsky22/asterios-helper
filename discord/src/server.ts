import * as dotenv from 'dotenv';
import express = require('express');
import logger = require('morgan');

dotenv.config();

const expressApp = express();

if (expressApp.get('env') === 'development') {
  expressApp.use(logger('dev'));
} else if (expressApp.get('env') === 'production') {
  expressApp.use(logger('combined'));
}

expressApp.get('/', (_req, res) => {
  res.send('Hello World');
});

expressApp.get('/health', (_req, res) => {
  const healthResponse = {
    data: {
      healthy: true,
    },
    message: '',
    success: true,
    statusCode: 200,
  };

  res.json(healthResponse);
});

export default expressApp;
