const {validators: {isBoolean}} = require('../../dist/build.common');

describe('Valid boolean should be true', () => {
  test.each([
    ['true', {}, true],
    ['false', {}, true],
    ['0', {}, true],
    ['1', {}, true],
  ])('isBoolean("%s", %s) = %s', (a, b, expected) => {
    expect(isBoolean(a, b)).toBe(expected);
  });
});

describe('Invalid boolean should be false', () => {
  test.each([
    ['1.0', {}, false],
    ['0.0', {}, false],
    ['true ', {}, false],
    ['False', {}, false],
    ['True', {}, false],
    ['yes', {}, false],
  ])('isBoolean("%s", %s) = %s', (a, b, expected) => {
    expect(isBoolean(a, b)).toBe(expected);
  });
});

describe('Valid boolean should be true (User loose option = true)', () => {
  test.each([
    ['true', {loose: true}, true],
    ['True', {loose: true}, true],
    ['TRUE', {loose: true}, true],
    ['false', {loose: true}, true],
    ['False', {loose: true}, true],
    ['FALSE', {loose: true}, true],
    ['0', {loose: true}, true],
    ['1', {loose: true}, true],
    ['yes', {loose: true}, true],
    ['Yes', {loose: true}, true],
    ['YES', {loose: true}, true],
    ['no', {loose: true}, true],
    ['No', {loose: true}, true],
    ['NO', {loose: true}, true],
  ])('isBoolean("%s", %s) = %s', (a, b, expected) => {
    expect(isBoolean(a, b)).toBe(expected);
  });
});

describe('Invalid boolean should be false (User loose option = true)', () => {
  test.each([
    ['1.0', {loose: false}, false],
    ['0.0', {loose: false}, false],
    ['true ', {loose: false}, false],
    [' false', {loose: false}, false],
  ])('isBoolean("%s", %s) = %s', (a, b, expected) => {
    expect(isBoolean(a, b)).toBe(expected);
  });
});