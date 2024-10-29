import {validators} from '../../dist/build.mjs';

test.each([
  ['', {}, true],
  [undefined, {}, true],
  [null, {}, true],
  [[], {}, true],
  [NaN, {}, true],
  [' ', {}, false],
  ['foo', {}, false],
  ['3', {}, false],
  ['', {ignoreWhitespace: false}, true],
  [' ', {ignoreWhitespace: false}, false],
  ['foo', {ignoreWhitespace: false}, false],
  ['3', {ignoreWhitespace: false}, false],
  ['', {ignoreWhitespace: true}, true],
  [' ', {ignoreWhitespace: true}, true],
  ['foo', {ignoreWhitespace: true}, false],
  ['3', {ignoreWhitespace: true}, false],
])('validators.isEmpty("%s", "%s") should return %s', (received, options, expected) => {
  expect(validators.isEmpty(received, options)).toBe(expected);
});