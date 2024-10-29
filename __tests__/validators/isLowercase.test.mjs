import {validators} from '../../dist/build.mjs';

test.each([
  ['abc', true],
  ['abc123', true],
  ['this is lowercase.', true],
  ['tr竪s 端ber', true],
  ['fooBar', false],
  ['123A', false],
])('validators.isLowercase("%s") should return %s', (received, expected) => {
  expect(validators.isLowercase(received)).toBe(expected);
});