import validator from 'validator';
import {merge} from 'deep-fusion';
import IsJSONOptions from '~/interfaces/IsJSONOptions';

/**
 * Check for valid JSON (using JSON.parse).
 */
export default (value: string, options?: IsJSONOptions): boolean => {
  // Initialize options.
  options = merge({
    allowPrimitives: false,
  }, options);

  // Returns validation results.
  // @ts-ignore
  return validator.isJSON(value, {
    allow_primitives: options?.allowPrimitives,
  });
}