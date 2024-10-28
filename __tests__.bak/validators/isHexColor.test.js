const {validators: {isHexColor}} = require('../../dist/build.common');

describe('Valid hex color should be true', () => {
  test.each([
    ['#ff0000ff', true],
    ['#ff0034', true],
    ['#CCCCCC', true],
    ['0f38', true],
    ['fff', true],
    ['#f00', true],
  ])('isHexColor("%s") = %s', (a, expected) => {
    expect(isHexColor(a)).toBe(expected);
  });
});

describe('Invalid hex color should be false', () => {
  test.each([
    ['#ff', false],
    ['fff0a', false],
    ['#ff12FG', false],
  ])('isHexColor("%s") = %s', (a, expected) => {
    expect(isHexColor(a)).toBe(expected);
  });
});