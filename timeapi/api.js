import { timeAPI } from '../config.js'
import fetch from 'node-fetch'
import { isValidTimezone } from './utils.js'

export const getDatetimeByTimezone = async (message) => {
    const timezone = message.text[0].match(/(?<=\!timeat\s)(\w[^\s]+)/gi)[0]
    const validatedTZ = await isValidTimezone(timezone)

    if(validatedTZ){
        return await fetch(timeAPI + validatedTZ).then(response => {
            if (response.status === 503) {
                throw new Error('World Time API unavailable');
            }
            return response.json();
        })
    }

    throw new Error('Unknown timezone')
}