import 'dotenv/config'

export const icrConfig = {
    server: process.env.IRC_SERVER,
    nick: process.env.BOT_NICKNAME,
    channels: process.env.CHANNELS.split(",")
}

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
}

export const timeAPI = process.env.TIME_API