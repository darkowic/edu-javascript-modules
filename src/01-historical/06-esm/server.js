const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript'
    };
    const contentType = contentTypes[extname] || 'text/plain';

    // For ES modules, we need to set the correct MIME type
    const headers = {
        'Content-Type': contentType
    };
    if (extname === '.js') {
        headers['Content-Type'] = 'text/javascript';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end('Error loading ' + filePath);
        } else {
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
});

const port = 3002;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
