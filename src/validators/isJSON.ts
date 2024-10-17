import validator from 'validator';

/**
 * Checks if a string is valid JSON.
 * @param {string} value The string to validate.
 * @return {boolean} `true` if the string is valid JSON, `false` otherwise.
 */
export default (value: string): boolean => {
  return validator.isJSON(value);
}

// /**
//  * Options for JSON validation.
//  */
// interface IsJSONOptions {
//   /**
//    * Accepts primitive JSON values (`true`, `false`, `null`) if `true`. Defaults to `false`.
//    */
//   allowPrimitives?: boolean;
// }

// /**
//  * Checks if a string is valid JSON.
//  * @param {string} value The string to validate.
//  * @param {IsJSONOptions} options Options for JSON validation.
//  * @return {boolean} `true` if the string is valid JSON, `false` otherwise.
//  */
// export default (value: string, options: IsJSONOptions = {allowPrimitives: false}): boolean => {
//   const validatorOptions = {
//     allow_primitives: options.allowPrimitives,
//   };
//   try{
//     return validator.isJSON(value, validatorOptions);
//   } catch(e) {
//     // validator.isJSON throws an error if allow_primitives is true and value is not a string.
//     // This check handles the case where options.allowPrimitives is true and value is a primitive.
//     if (validatorOptions.allow_primitives && ['true', 'false', 'null'].includes(value))
//       return true;
//     return false;
//   }
// }