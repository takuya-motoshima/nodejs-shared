const {validators: {isFloat}} = require('../../dist/build.common');

describe('Valid float should be true', () => {
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
  ])('isFloat("%s") = %s', (a, expected) => {
    expect(isFloat(a)).toBe(expected);
  });
});

describe('Invalid float should be false', () => {
  test.each([
    ['+', false],
    ['-', false],
    ['  ', false],
    ['', false],
    ['.', false],
    [',', false],
    ['foo', false],
    ['20.foo', false],
    ['2020-01-06T14:31:00.135Z', false],
  ])('isFloat("%s") = %s', (a, expected) => {
    expect(isFloat(a)).toBe(expected);
  });
});