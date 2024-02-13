//Creating server
const http = require('http');

const routing = require('./routing');

const server = http.createServer(routing);
    


server.listen(5000);



