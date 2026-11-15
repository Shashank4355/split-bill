const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer((req, res) => {
  const name = req.url === '/' ? 'index.html' : path.basename(req.url.split('?')[0]);
  const file = path.join(__dirname, name);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log(`Split the Bill on http://localhost:${port}`));
