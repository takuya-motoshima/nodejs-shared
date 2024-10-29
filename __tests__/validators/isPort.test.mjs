import {validators} from '../../dist/build.mjs';

test.each([
  ['0', true],
  ['22', true],
  ['80', true],
  ['443', true],
  ['3000', true],
  ['8080', true],
  ['65535', true],
  ['', false],
  ['-1', false],
  ['65536', false],
])('validators.isPort("%s") should return %s', (received, expected) => {
  expect(validators.isPort(received)).toBe(expected);
});