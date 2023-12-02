import { CLIENTS } from "../index.js";
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleAddClient = (req, res) => {
    let body = '';
    try {
        req.on('data', chunk => {
            body += chunk;
        });
    } catch (error) {
        console.log(`Error while reading request`);
        sendError(res, 500, 'Server error while reading request')
    }

    req.on('end', async () => {
        try {
            const newClient = JSON.parse(body);

            if(!newClient.fullName || !newClient.phone || !newClient.ticketNumber || !newClient.booking) {
                sendError(res, 400, 'Wrong personal data');
                return;
            }


            if(
            newClient.booking && 
            (!newClient.booking.length ||
            !Array.isArray(newClient.booking) ||
            !newClient.booking.every(item => item.comedian && item.time))
            ) {
            sendError(res, 400, 'Booking fields are filled wrong');
            return;
            }

            const clientData = await fs.readFile(CLIENTS, 'utf8');
            const clients = JSON.parse(clientData);

            clients.push(newClient);

            await fs.writeFile(CLIENTS, JSON.stringify(clients));
            sendData(res, newClient);
        } catch (error) {
            console.log('error: ', error);
            
        }
    });
}