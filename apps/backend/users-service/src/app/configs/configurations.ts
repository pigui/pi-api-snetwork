export default () => ({
  natsUrl: process.env.NATS_URL,
  database: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
});
