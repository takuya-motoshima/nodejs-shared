import validator from 'validator';
import {merge} from 'deep-fusion';
import IsJSONOptions from '~/interfaces/IsJSONOptions';

/**
 * Check if it is a valid JWT token.
 *
 * @param {string} value Value to be validated.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string): boolean => {
  // Returns validation results.
  return validator.isJWT(value);
}