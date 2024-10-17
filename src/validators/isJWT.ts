import validator from 'validator';

/**
 * Checks if the given string is a valid JWT (JSON Web Token).
 * @param {string} value The string to validate.
 * @return {boolean} True if the string is a valid JWT, false otherwise.
 */
export default (value: string): boolean => {
  return validator.isJWT(value);
}