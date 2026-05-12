import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),

  CORS_ORIGINS: env.get('CORS_ORIGINS').required().asString(),

  POSTGRES_HOST: env.get('POSTGRES_HOST').required().asString(),
  POSTGRES_PORT: env.get('POSTGRES_PORT').required().asPortNumber(),
  POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
  POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
  POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
  POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),
  FIREBASE_API_KEY: env.get('FIREBASE_API_KEY').required().asString(),
  FIREBASE_AUTH_DOMAIN: env.get('FIREBASE_AUTH_DOMAIN').required().asString(),
  FIREBASE_PROJECT_ID: env.get('FIREBASE_PROJECT_ID').required().asString(),
  FIREBASE_STORAGE_BUCKET: env.get('FIREBASE_STORAGE_BUCKET').required().asString(),
  FIREBASE_MESSAGING_SENDER_ID: env.get('FIREBASE_MESSAGING_SENDER_ID').required().asString(),
  FIREBASE_APP_ID: env.get('FIREBASE_APP_ID').required().asString(),
};
