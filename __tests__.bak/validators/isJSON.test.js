const {validators: {isJSON}} = require('../../dist/build.common');

describe('Valid JSON should be true', () => {
  test.each([
    ['{"key": "value"}', {}, true],
    ['{}', {}, true],
  ])('isJSON("%s", %s) = %s', (a, b, expected) => {
    expect(isJSON(a, b)).toBe(expected);
  });
});

describe('Invalid JSON should be false', () => {
  test.each([
    ['{key: "value"}', {}, false],
    ['{\'key\': \'value\'}', {}, false],
    ['null', {}, false],
    ['1234', {}, false],
    ['"nope"', {}, false],
  ])('isJSON("%s", %s) = %s', (a, b, expected) => {
    expect(isJSON(a, b)).toBe(expected);
  });
});

describe('Valid JSON should be true (Use allowPrimitives option = false)', () => {
  test.each([
    ['{"key": "value"}', {allowPrimitives: true}, true],
    ['{}', {allowPrimitives: true}, true],
    ['null', {allowPrimitives: true}, true],
    ['false', {allowPrimitives: true}, true],
    ['true', {allowPrimitives: true}, true],
  ])('isJSON("%s", %s) = %s', (a, b, expected) => {
    expect(isJSON(a, b)).toBe(expected);
  });
});

describe('Invalid JSON should be false (Use allowPrimitives option = false)', () => {
  test.each([
    ['{key: "value"}', {allowPrimitives: true}, false],
    ['{\'key\': \'value\'}', {allowPrimitives: true}, false],
    ['{"key": value}', {allowPrimitives: true}, false],
    ['1234', {allowPrimitives: true}, false],
    ['"nope"', {allowPrimitives: true}, false],
  ])('isJSON("%s", %s) = %s', (a, b, expected) => {
    expect(isJSON(a, b)).toBe(expected);
  });
});