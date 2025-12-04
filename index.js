const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/about') {
    res.end("About Page - This project belongs to Anniepel.");
  } else {
    res.end("Hello, this is a basic web app! By Annie Pelouat");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
