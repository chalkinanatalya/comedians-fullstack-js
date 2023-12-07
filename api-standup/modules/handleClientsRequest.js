
import { CLIENTS } from "../index.js";
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleClientsRequest = async (req, res, ticketNumber) => {
    try {
        const clientData = await fs.readFile(CLIENTS, 'utf8');
        const clients = JSON.parse(clientData);

        const client = clients.find(c => c.ticketNumber === ticketNumber);

        if(!client) {
            sendError(res, 404, 'Client matches this ticket number is not found');
            return;
        }

        sendData(res, client);

    } catch (error) {
        console.error('Error while processing request: ', error);

        sendError(res, 500, 'Server error while processing request');
    }
}