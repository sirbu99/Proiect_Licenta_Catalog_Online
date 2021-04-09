const fs = require('fs');
const http = require('http');

http.createServer(function(req, res) {
    let fullPath = __dirname + "/public" + req.url;
    if (req.url === '/' || !fs.existsSync(fullPath)) {
        fullPath = __dirname + "/public/index.html";
    }
    fs.readFile(fullPath, function(err, data) {
        res.writeHead(200);
        res.end(data);
    });
}).listen(4000);