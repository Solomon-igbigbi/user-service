import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

const schema = joi
  .object({
    PORT: joi.number().required(),
    ENVIRONMENT: joi
      .string()
      .valid('development', 'production', 'staging')
      .required(),
    DATABASE_URL: joi.string().uri().required(),
    SECRET: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.string().required(),
    REDIS_PASSWORD: joi.string().required(),
    REDIS_USERNAME: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`ENV validation error: ${error.message}`);
}

export const config = {
  PORT: {
    APP_PORT: envVars.PORT,
  },
  ENVIRONMENT: envVars.ENVIRONMENT,
  SECRET: envVars.SECRET,
  REDIS: {
    HOST: envVars.REDIS_HOST,
    PORT: envVars.REDIS_PORT,
    PASSWORD: envVars.REDIS_PASSWORD,
    USERNAME: envVars.REDIS_USERNAME,
  },
};
