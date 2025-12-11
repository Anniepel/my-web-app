const http = require('http');
const server = http.createServer((req, res) => {

  if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About Page\n');

  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World! By Annie\n');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
