import validator from 'validator';
import {merge} from 'deep-fusion';
import IsJSONOptions from '~/interfaces/IsJSONOptions';

/**
 * Check if it is a valid JWT token.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isJWT(value);
}