/**
 * Check if the color is an HSL color based on the CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 *
 * @param {string} value Value to be validated.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string) => boolean;
export default _default;
