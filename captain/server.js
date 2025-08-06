const http = require('http');
const app = require('./app');

const server = http.createServer(app)



server.listen(3002, ()=>{
    console.log("Captain Service running on port http://localhost:3002");
    
})