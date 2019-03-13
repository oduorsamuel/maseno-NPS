'use strict';

const Hapi = require('hapi');
const request = require('request');
const routes = require('./routes');
const connection = require('./dbConnection');
var response = require('./models/query');



const server = Hapi.Server({
  port: 3000,
  host: 'localhost',
  routes: {
    cors: true
  }
});
const validate = async (_request, username, password) => {
  return new Promise(
    (resolve, reject) => {
      if (username === 'sam') resolve({isValid: true, credentials: {}})
      if (password === 'sam') resolve({isValid: true, credentials: {}})
      else resolve({isValid: false, credentials: {}})});
  };

const init = async () => {
  connection.connect();
  
  await server.register([
    {plugin: require('hapi-auth-basic')},
    {plugin: require('inert')}
  ]);

  server.auth.strategy('simple', 'basic', { validate });

  for (var route of routes.routesFxn(connection,validate)) {
    server.route(route);
  }

  // causes all routes to require authentication
  server.auth.default('simple');

  await server.start();
  console.log('Server is running');
}

init();

// Upon ctrl-c, mysql connection is closed, and server is shut down.
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});