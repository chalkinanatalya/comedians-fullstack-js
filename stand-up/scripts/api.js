import { Notification } from './notification.js';

const API_URL = 'http://localhost:8080/';

export const getComedians = async () => {
    try {
        const response = await fetch(`${API_URL}comedians`);
        if(!response.ok) {
            throw new Error(`Server error ${response.status}`)
        }
        return response.json();
    } catch (error) {
        console.error(`Some problem occured with fetch request ${error}`);
        Notification.getInstance().show('Something went wrong, we are already working on it');
    }
};

export const getClient = async (ticket) => {
    try {
        const response = await fetch(`${API_URL}clients/${ticket}`);
        if(!response.ok) {
            throw new Error(`Server error ${response.status}`)
        }
        return response.json();
    } catch (error) {
        console.error(`Some problem occured with fetch request ${error}`);
        Notification.getInstance().show('Something went wrong, we are already working on it');
    }
};

export const sendData = async (method, data, id) => {
    try {
        const response = await fetch(`${API_URL}clients${id ? `/${id}` : ''}`, {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if(!response.ok) {
            throw new Error(`Server error ${response.status}`)
        }
        return true;
    } catch (error) {
        console.error(`Some problem occured with fetch request ${error}`);
        Notification.getInstance().show('Something went wrong, we are already working on it');
        return false;
    }
}