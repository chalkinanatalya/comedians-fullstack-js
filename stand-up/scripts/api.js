import { Notification } from './notification.js';

export const getComedians = async () => {
    try {
        const response = await fetch('http://localhost:8080/comedians');
        if(!response.ok) {
            throw new Error(`Server error ${response.status}`)
        }
        return response.json();
    } catch (error) {
        console.error(`Some problem occured with fetch request ${error}`);
        Notification.getInstance().show('Something went wrong, we are already working on it');
    }
}