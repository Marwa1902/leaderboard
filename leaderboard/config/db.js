const Redis = require('ioredis'); //setting up Redis
require('dotenv').config();

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redis;
