import {validators} from '../../dist/build.mjs';

test.each([
  ['ABC', true],
  ['ABC123', true],
  ['ALL CAPS IS FUN.', true],
  ['   .', true],
  ['fooBar', false],
  ['123abc', false],
])('validators.isUppercase("%s") should return %s', (received, expected) => {
  expect(validators.isUppercase(received)).toBe(expected);
});