const {validators: {isAlphanumeric}} = require('../../dist/build.common');

describe('Valid alphanumeric characters should be true', () => {
  test.each([
    ['abc123', {}, true],
    ['ABC11', {}, true],
  ])('isAlphanumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isAlphanumeric(a, b)).toBe(expected);
  });
});

describe('Invalid alphanumeric characters should be false', () => {
  test.each([
    ['abc123', {}, true],
    ['ABC11', {}, true],
  ])('isAlphanumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isAlphanumeric(a, b)).toBe(expected);
  });
});

describe('Valid alphanumeric characters should be true (Use ignore option)', () => {
  test.each([
    ['Hello@123', {ignore: '@_- '}, true],
    ['this is a valid alphaNumeric string', {ignore: '@_- '}, true],
    ['En-US @ alpha_numeric', {ignore: '@_- '}, true],
    ['en-US', {ignore: /[\s/-]/g}, true],
    ['this is a valid alphaNumeric string', {ignore: /[\s/-]/g}, true],
  ])('isAlphanumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isAlphanumeric(a, b)).toBe(expected);
  });
});

describe('Invalid alphanumeric characters should be false (Use ignore option)', () => {
  test.each([
    ['In*Valid', {ignore: '@_- '}, false],
    ['hello$123', {ignore: '@_- '}, false],
    ['{invalid}', {ignore: '@_- '}, false],
    ['INVALID$ AlphaNum Str', {ignore: /[\s/-]/g}, false],
    ['hello@123', {ignore: /[\s/-]/g}, false],
    ['abc*123', {ignore: /[\s/-]/g}, false],
  ])('isAlphanumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isAlphanumeric(a, b)).toBe(expected);
  });
});