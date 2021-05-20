import { initClient as initJerkClient } from './client/index.js'
import { client as redisClient } from './redis/index.js'

const jerkClient = initJerkClient()

process.on('SIGINT', function() {
    redisClient.quit()
    jerkClient.quit('Closing bot connection with ICR server')
    process.exit();
});