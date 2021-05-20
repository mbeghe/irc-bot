## IRC Bot
### Local environment setup
1. npm install

2. Setup a local redis server
    - Easiest way is to install Docker desktop and get latest redis image(docker pull redis) and create a local container
  
3. Create .env file containing the below listed environment variables:
    ```
      IRC_SERVER=example.icr.url.net
      BOT_NICKNAME=botnameexample
      CHANNELS=examplechannelname1,examplechannelname2
      TIME_API=http://worldtimeapi.org/api/timezone/
      REDIS_HOST=localhost
      REDIS_PORT=6379
    ```
 
4. npm run dev (with nodemon to track changes) or simply npm start
