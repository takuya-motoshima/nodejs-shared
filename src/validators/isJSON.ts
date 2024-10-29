import validator from 'validator';

/**
 * Options for JSON validation.
 * @interface
 */
export interface IsJSONOptions {
  /**
   * Accepts primitive JSON values (`true`, `false`, `null`) if `true`. Defaults to `false`.
   */
  allowPrimitives?: boolean;
}

/**
 * Checks if a string is valid JSON.
 * @param {string} value The string to validate.
 * @param {IsJSONOptions} options Options for JSON validation.
 * @return {boolean} `true` if the string is valid JSON, `false` otherwise.
 */
export default (value: string, options: IsJSONOptions = {}): boolean => {
  const mergedOptions = {
    allowPrimitives: false,
    ...options,
  };
  const validatorOptions = {
    allow_primitives: mergedOptions.allowPrimitives,
  };
 
  // NOTE: validator.isJSON accepts an options object as its second parameter,
  // but this is missing from its TypeScript definitions, causing a type error.
  // Consider submitting a PR to the validator library to update the types.
  // @ts-ignore
  return validator.isJSON(value, validatorOptions);
}