const {validators: {isUppercase}} = require('../../dist/build.common');

describe('Valid uppercase should be true', () => {
  test.each([
    ['ABC', true],
    ['ABC123', true],
    ['ALL CAPS IS FUN.', true],
    ['   .', true],
  ])('isUppercase("%s") = %s', (a, expected) => {
    expect(isUppercase(a)).toBe(expected);
  });
});

describe('Invalid uppercase should be false', () => {
  test.each([
    ['fooBar', false],
    ['123abc', false],
  ])('isUppercase("%s") = %s', (a, expected) => {
    expect(isUppercase(a)).toBe(expected);
  });
});