import http from "node:http";
import fs from "node:fs/promises";

const PORT = 8080;
const COMEDIANS = './comedians.json';
const CLIENTS = './clients.json';

const checkFiles = async () => {
    try {
        await fs.access(COMEDIANS);
    } catch (error) {
        console.error(`File ${COMEDIANS} wasn't found`);
        return false;
    }

    try {
        await fs.access(CLIENTS);
    } catch (error) {
        await fs.writeFile(CLIENTS, JSON.stringify([]));
        console.log(`File ${CLIENTS} has been created`);
        return false;
    }
    return true;
};

const sendData = (res, data) => {
    res.writeHead(200, {
        'content-type': 'text/json; charset=utf-8',
        'access-control-allow-origin': '*'
    });

    res.end(data);
}

const sendError = (res, statusCode, errMessage) => {
    res.writeHead(statusCode, {
        'content-type': 'text/plain; charset=utf-8',
    });
    res.end(errMessage);
}

const startServer = async () => {
    if(!(await checkFiles())) {
        return;
    }
    http.createServer(async (req, res) => {
        try {
            const segments = req.url.split('/').filter(Boolean);

            if(req.method === 'GET' && segments[0] === 'comedians') {
                const data = await fs.readFile(COMEDIANS, 'utf-8');
                if(segments.length === 2) {
                    const comedian = JSON.parse(data).find(c => c.id === segments[1])

                    if(!comedian) {
                        sendError(res, 404, 'Comedian is not found');
                        return;
                    }

                    sendData(res, JSON.stringify(comedian));
                    return;
                }
    
                sendData(res, data);
                return;
            } 
            
            if(req.method === 'POST' && segments[0] == 'clients') {
                // POST /clients
            }
    
            if(req.method === 'GET' && segments[0] == 'clients' && segments.length === 2) {
                // GET /clients/:ticket
                //get client by ticket number
            }
    
            if(req.method === 'PATCH' && segments[0] == 'clients' && segments.length === 2) {
                // PATCH /clients/:ticket
                //edit client by ticket number
            }

            sendError(res, 404, '404 Page is not found');
        } catch (error) {
            sendError(res, 500, `Server error: ${err.message}`);
        }
    }).listen(PORT);

    console.log(`Server launched on port http://localhost:${PORT}`);
}

startServer();
