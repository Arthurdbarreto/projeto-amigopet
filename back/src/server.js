const app = require('./app');
const env = require('./config/env');
const connectDatabase = require('./config/database');

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`AmigoPet API running on port ${env.port}`);
    console.log(`Swagger available at http://localhost:${env.port}/api-docs`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start AmigoPet API', error);
  process.exit(1);
});
