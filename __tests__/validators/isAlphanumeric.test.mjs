import {validators} from '../../dist/build.mjs';

test.each([
  ['abc123', {}, true],
  ['ABC11', {}, true],
  ['abc123', {}, true],
  ['ABC11', {}, true],
  ['Hello@123', {ignore: '@_- '}, true],
  ['this is a valid alphaNumeric string', {ignore: '@_- '}, true],
  ['En-US @ alpha_numeric', {ignore: '@_- '}, true],
  ['en-US', {ignore: /[\s/-]/g}, true],
  ['this is a valid alphaNumeric string', {ignore: /[\s/-]/g}, true],
  ['In*Valid', {ignore: '@_- '}, false],
  ['hello$123', {ignore: '@_- '}, false],
  ['{invalid}', {ignore: '@_- '}, false],
  ['INVALID$ AlphaNum Str', {ignore: /[\s/-]/g}, false],
  ['hello@123', {ignore: /[\s/-]/g}, false],
  ['abc*123', {ignore: /[\s/-]/g}, false],
])('validators.isAlphanumeric("%s", "%s") should return %s', (received, options, expected) => {
  expect(validators.isAlphanumeric(received, options)).toBe(expected);
});