import axios from 'axios';
import { getBirthDatesPath, sendBlessingPath } from './urlPath';

export async function getAllBirthDates() {
     return await axios.get(getBirthDatesPath);
}

export async function sendBlessing(data) {
    return await axios.post(sendBlessingPath, data);
}