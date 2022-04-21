const { createServer } = require('http');
const { app } = require('./src/config');
const learnerService = require('./src/app');

const server = createServer(learnerService);

const port = app.port;
const host = app.host;

server.listen(port, host, () => {
    console.log(`${app.name} is running on ${app.host}:${app.port}`);
});
