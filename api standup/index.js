import http from "node:http";
import fs from "node:fs/promises";

const PORT = 8080;

http.createServer(async (req, res) => {
    if(req.method === 'GET' && req.url === '/comedians') {
        try {
            const data = await fs.readFile('comedians.json', 'utf-8')
            res.writeHead(200, {
                'content-type': 'text/json; charset=utf-8',
                'access-control-allow-origin': '*'
            })
            res.end(data)
        } catch (err) {
            res.writeHead(500, {
                'content-type': 'text/plain; charset=utf-8',
            });
            res.end(`Server error: ${err.message}`);
        }
    } else {
        res.writeHead(404, {
            'content-type': 'text/plain; charset=utf-8',
        });
        res.end('404 Page is not found');
    }
}).listen(PORT)

console.log(`Server launched on port http://localhost:${PORT}`);