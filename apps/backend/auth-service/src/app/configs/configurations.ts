export default () => ({
  natsUrl: process.env.NATS_URL,
  redisUrl: process.env.REDIS_URL,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
});
