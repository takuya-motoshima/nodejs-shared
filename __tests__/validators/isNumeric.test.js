const {validators: {isNumeric}} = require('../../dist/build.common');

describe('Valid numeric should be true', () => {
  test.each([
    ['123', {}, true],
    ['00123', {}, true],
    ['-00123', {}, true],
    ['0', {}, true],
    ['-0', {}, true],
    ['+123', {}, true],
    ['123.123', {}, true],
    ['+000000', {}, true],
  ])('isNumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isNumeric(a, b)).toBe(expected);
  });
});

describe('Invalid numeric should be false', () => {
  test.each([
    [' ', {}, false],
    ['', {}, false],
    ['.', {}, false],
  ])('isNumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isNumeric(a, b)).toBe(expected);
  });
});

describe('Valid numeric should be true (Use noSymbols option = true)', () => {
  test.each([
    ['123', {noSymbols: true}, true],
    ['00123', {noSymbols: true}, true],
    ['0', {noSymbols: true}, true],
  ])('isNumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isNumeric(a, b)).toBe(expected);
  });
});

describe('Invalid numeric should be false (Use noSymbols option = true)', () => {
  test.each([
    ['-0', {noSymbols: true}, false],
    ['+000000', {noSymbols: true}, false],
    ['', {noSymbols: true}, false],
    ['+123', {noSymbols: true}, false],
    ['123.123', {noSymbols: true}, false],
    ['-00123', {noSymbols: true}, false],
    [' ', {noSymbols: true}, false],
    ['.', {noSymbols: true}, false],
  ])('isNumeric("%s", %s) = %s', (a, b, expected) => {
    expect(isNumeric(a, b)).toBe(expected);
  });
});