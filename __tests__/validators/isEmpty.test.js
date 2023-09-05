const {validators: {isEmpty}} = require('../../dist/build.common');

describe('Valid empty should be true', () => {
  test.each([
    ['', {}, true],
    [undefined, {}, true],
    [null, {}, true],
    [[], {}, true],
    [NaN, {}, true],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});

describe('Invalid empty should be false', () => {
  test.each([
    [' ', {}, false],
    ['foo', {}, false],
    ['3', {}, false],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});

describe('Valid empty should be true (Use ignoreWhitespace option = false)', () => {
  test.each([
    ['', {ignoreWhitespace: false}, true],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});

describe('Invalid empty should be false (Use ignoreWhitespace option = false)', () => {
  test.each([
    [' ', {ignoreWhitespace: false}, false],
    ['foo', {ignoreWhitespace: false}, false],
    ['3', {ignoreWhitespace: false}, false],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});

describe('Valid empty should be true (Use ignoreWhitespace option = true)', () => {
  test.each([
    ['', {ignoreWhitespace: true}, true],
    [' ', {ignoreWhitespace: true}, true],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});

describe('Invalid empty should be false (Use ignoreWhitespace option = true)', () => {
  test.each([
    ['foo', {ignoreWhitespace: true}, false],
    ['3', {ignoreWhitespace: true}, false],
  ])('isEmpty("%s", %s) = %s', (a, b, expected) => {
    expect(isEmpty(a, b)).toBe(expected);
  });
});