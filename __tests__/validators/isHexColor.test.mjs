import {validators} from '../../dist/build.mjs';

test.each([
  ['#ff0000ff', true],
  ['#ff0034', true],
  ['#CCCCCC', true],
  ['0f38', true],
  ['fff', true],
  ['#f00', true],
  ['#ff', false],
  ['fff0a', false],
  ['#ff12FG', false],
])('validators.isHexColor("%s") should return %s', (received, expected) => {
  expect(validators.isHexColor(received)).toBe(expected);
});
