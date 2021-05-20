import dayjs from 'dayjs'
import jerk from 'jerk'
import { icrConfig } from '../config.js'
import { getDatetimeByTimezone } from '../timeapi/index.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import { getCount, processTimezone } from '../services/popularity/index.js'
dayjs.extend(timezone)
dayjs.extend(utc)

const initClient = () => {

    const client = jerk(bot => {
        
        bot.watch_for('!timeat', async message => {
            try {
                const { timezone, datetime } = await getDatetimeByTimezone(message)

                message.say(`Current datetime for Timezone: ${timezone} is ${dayjs(datetime).tz(timezone).format('DD MMM YYYY HH:mm')}`)
                processTimezone(timezone)
            } catch (error) {
                message.say(`Request errored. ${error}`)
            }
        })

        bot.watch_for('!timepopularity', async message => {

            try {
                await getCount(message).then(counts => {
                    counts.forEach(value => {
                        message.say(`Timezone: ${value.timezone} was called ${value.count} times.`)
                    })
                })
            } catch (error) {
                message.say(`Request errored. ${error}`)
            }
        })

    }).connect(icrConfig)

    return client
}

export default initClient
