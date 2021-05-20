import { timeAPI } from '../config.js'
import fetch from 'node-fetch'


export const isValidTimezone = async (timezone) => {
    const lastTzWord = getLastTzWord(timezone)
    const validTimeZones = await getValidTimeZones()

    return validTimeZones.find(tz => lastTzWord == getLastTzWord(tz))
}
const getLastTzWord = (tz) => {
    return tz.split('/').pop()
}


const getValidTimeZones = async () => {
    return await fetch(timeAPI)
            .then(response => {
                if (response.status === 503) {
                    throw new Error('World Time API unavailable');
                }
                return response.json();
            })
}