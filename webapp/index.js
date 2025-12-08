const http = require('http');
const auth = require('./auth');

const server = http.createServer((req, res) => {
  if (req.url === '/about') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page\n');
  } else if (req.url === '/auth') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(auth.getWelcomeMessage());
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, this is a basic web app! by Annie Pelouat');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
