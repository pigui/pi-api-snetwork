export default () => ({
  natsUrl: process.env.NATS_URL,
  database: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
  redisUrl: process.env.REDIS_URL,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
});
