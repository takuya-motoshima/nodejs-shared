const {validators: {isLowercase}} = require('../../dist/build.common');

describe('Valid lowercase should be true', () => {
  test.each([
    ['abc', true],
    ['abc123', true],
    ['this is lowercase.', true],
    ['tr竪s 端ber', true],
  ])('isLowercase("%s") = %s', (a, expected) => {
    expect(isLowercase(a)).toBe(expected);
  });
});

describe('Invalid lowercase should be false', () => {
  test.each([
    ['fooBar', false],
    ['123A', false],
  ])('isLowercase("%s") = %s', (a, expected) => {
    expect(isLowercase(a)).toBe(expected);
  });
});