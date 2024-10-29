import {validators} from '../../dist/build.mjs';

test.each([
  ['123', {}, true],
  ['00123', {}, true],
  ['-00123', {}, true],
  ['0', {}, true],
  ['-0', {}, true],
  ['+123', {}, true],
  ['123.123', {}, true],
  ['+000000', {}, true],
  [' ', {}, false],
  ['', {}, false],
  ['.', {}, false],
  ['123', {noSymbols: true}, true],
  ['00123', {noSymbols: true}, true],
  ['0', {noSymbols: true}, true],
  ['-0', {noSymbols: true}, false],
  ['+000000', {noSymbols: true}, false],
  ['', {noSymbols: true}, false],
  ['+123', {noSymbols: true}, false],
  ['123.123', {noSymbols: true}, false],
  ['-00123', {noSymbols: true}, false],
  [' ', {noSymbols: true}, false],
  ['.', {noSymbols: true}, false],
])('validators.isNumeric("%s", %s) should return %s', (received, options, expected) => {
  expect(validators.isNumeric(received, options)).toBe(expected);
});