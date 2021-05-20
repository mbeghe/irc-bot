import redis from 'redis';
import { redisConfig } from '../config.js'
import { promisify } from 'util'
const { createClient } = redis

const client = createClient({
    host: redisConfig.host,
    port: redisConfig.port
})

client.on('error', error => {
    console.error(error);
});

client.on('connect', () => {
    console.log(`Redis connected succesfully. Host: ${redisConfig.host} Port: ${redisConfig.port}`);
});


const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const existsAsync = promisify(client.exists).bind(client);

export { client, getAsync, setAsync, existsAsync }