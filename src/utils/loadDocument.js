import Ajv from 'ajv';
import schema from './buttons.schema.json';

const ajv = new Ajv();

export const loadDocument = async (path) => {
  const response = await fetch(path);
  const config = await response.json();
  const validate = ajv.compile(schema);
  const valid = validate(config);

  if (!valid) {
    console.error('Invalid configuration:', validate.errors);
    throw new Error('Invalid configuration');
  }

  return config;
};