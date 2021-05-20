import { existsAsync, getAsync, setAsync } from "../../redis/index.js";

const process = (timezone) => {
    const splitted = timezone.split('/')

    let tzStr = ''
    splitted.forEach(async (val, ix, arr) => {
        if(ix != arr.length-1){
            if(ix == 0){
                tzStr+=val
            } else {
                tzStr+= '/' + val
            }

            await insertTzKey(tzStr)
        }
    });
}

const insertTzKey = async (tzStr) => {
    const exists = await existsAsync(tzStr).catch(err => { throw err })
    console.log('exists', tzStr, exists)
    if(exists == 1){
        const tzCount = await getAsync(tzStr).catch(err => { throw err })
        await setAsync(tzStr, parseInt(tzCount) + 1).catch(err => { throw err })
    } else{
        await setAsync(tzStr, 1).catch(err => { throw err })
    }
}

export default process