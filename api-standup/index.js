import http from "node:http";
import fs from "node:fs/promises";
import { sendData, sendError } from "./modules/send.js";
import { checkFile } from "./modules/checkFile.js";
import { handleComediansRequest } from "./modules/handleComediansRequest.js";
import { handleAddClient } from "./modules/handleAddClient.js";

const PORT = 8080;
const COMEDIANS = './comedians.json';
export const CLIENTS = './clients.json';

const startServer = async () => {
    if(!(await checkFile(COMEDIANS))) {
        return;
    }

    await checkFile(CLIENTS, true);

    const comediansData = await fs.readFile(COMEDIANS, 'utf-8');
    const comedians = JSON.parse(comediansData);

    http.createServer(async (req, res) => {
        try {
            res.setHeader('access-control-allow-origin', '*');

            const segments = req.url.split('/').filter(Boolean);

            if(req.method === 'GET' && segments[0] === 'comedians') {
                handleComediansRequest(req, res, comedians, segments);
                return;
            } 
            
            if(req.method === 'POST' && segments[0] == 'clients') {
                handleAddClient(req, res);
                return;
                // POST /clients
            }
    
            if(req.method === 'GET' && segments[0] == 'clients' && segments.length === 2) {
                const ticket = segments[1];
                handleAddClient(req, res, ticket);
                return;
                // GET /clients/:ticket
                //get client by ticket number
            }
    
            if(req.method === 'PATCH' && segments[0] == 'clients' && segments.length === 2) {
                handleUpdateClient(req, res, segments);
                return;
                // PATCH /clients/:ticket
                //edit client by ticket number
            }

            sendError(res, 404, '404 Page is not found');
        } catch (error) {
            sendError(res, 500, `Server error: ${error.message}`);
        }
    }).listen(PORT);

    console.log(`Server launched on port http://localhost:${PORT}`);
}

startServer();


