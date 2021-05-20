import { existsAsync, getAsync } from '../../redis/index.js'
import { isValidTimezone } from '../../timeapi/utils.js'

const getCount = async (message) => {
    const timezone = message.text[0].match(/(?<=\!timepopularity\s)(\w[^\s]+)/gi)[0]
    const validatedTZ = await isValidTimezone(timezone)

    if(validatedTZ){
        const splitted = timezone.split('/')

        let tzStr = ''
        const result = []
        for (let index = 0; index < splitted.length; index++) {
            if(index != splitted.length-1){
                if(index == 0){
                    tzStr+=splitted[index]
                } else {
                    tzStr+= '/' + splitted[index]
                }
                const exists = await existsAsync(tzStr).catch(err => { throw err })
                if(exists == 1){
                    const value = await getAsync(tzStr).catch(err => { throw err })
                    result.push({
                        timezone: tzStr,
                        count: value
                    }) 
                }
            }
        }

        return result
    }

    throw new Error('Unknown timezone')
}

export default getCount