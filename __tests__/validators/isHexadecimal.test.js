const {validators: {isHexadecimal}} = require('../../dist/build.common');

describe('Valid hexadecimal should be true', () => {
  test.each([
    ['deadBEEF', true],
    ['ff0044', true],
    ['0xff0044', true],
    ['0XfF0044', true],
    ['0x0123456789abcDEF', true],
    ['0X0123456789abcDEF', true],
    ['0hfedCBA9876543210', true],
    ['0HfedCBA9876543210', true],
    ['0123456789abcDEF', true],
  ])('isHexadecimal("%s") = %s', (a, expected) => {
    expect(isHexadecimal(a)).toBe(expected);
  });
});

describe('Invalid hexadecimal should be false', () => {
  test.each([
    ['abcdefg', false],
    ['', false],
    ['..', false],
    ['0xa2h', false],
    ['0xa20x', false],
    ['0x0123456789abcDEFq', false],
    ['0hfedCBA9876543210q', false],
    ['01234q56789abcDEF', false],
  ])('isHexadecimal("%s") = %s', (a, expected) => {
    expect(isHexadecimal(a)).toBe(expected);
  });
});