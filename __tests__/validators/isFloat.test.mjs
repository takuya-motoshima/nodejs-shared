import {validators} from '../../dist/build.mjs';

test.each([
  ['123', true],
  ['123.', true],
  ['123.123', true],
  ['-123.123', true],
  ['-0.123', true],
  ['+0.123', true],
  ['0.123', true],
  ['.0', true],
  ['-.123', true],
  ['+.123', true],
  ['01.123', true],
  ['-0.22250738585072011e-307', true],
  ['+', false],
  ['-', false],
  ['  ', false],
  ['', false],
  ['.', false],
  [',', false],
  ['foo', false],
  ['20.foo', false],
  ['2020-01-06T14:31:00.135Z', false],
])('validators.isFloat("%s", "%s") should return %s', (received, expected) => {
  expect(validators.isFloat(received)).toBe(expected);
});