const {validators: {isInt}} = require('../../dist/build.common');

describe('Valid integer should be true', () => {
  test.each([
    ['13', {}, true],
    ['123', {}, true],
    ['0', {}, true],
    ['123', {}, true],
    ['-0', {}, true],
    ['+1', {}, true],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Invalid integer should be false', () => {
  test.each([
    ['100e10', {}, false],
    ['123.123', {}, false],
    ['   ', {}, false],
    ['', {}, false],
    ['01', {}, false],
    ['-01', {}, false],
    ['000', {}, false],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Valid integer should be true (Use allowLeadingZeroes option = true)', () => {
  test.each([
    ['13', {allowLeadingZeroes: true}, true],
    ['123', {allowLeadingZeroes: true}, true],
    ['0', {allowLeadingZeroes: true}, true],
    ['123', {allowLeadingZeroes: true}, true],
    ['-0', {allowLeadingZeroes: true}, true],
    ['+1', {allowLeadingZeroes: true}, true],
    ['01', {allowLeadingZeroes: true}, true],
    ['-01', {allowLeadingZeroes: true}, true],
    ['000', {allowLeadingZeroes: true}, true],
    ['-000', {allowLeadingZeroes: true}, true],
    ['+000', {allowLeadingZeroes: true}, true],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Invalid integer should be false (Use allowLeadingZeroes option = true)', () => {
  test.each([
    ['100e10', {allowLeadingZeroes: true}, false],
    ['123.123', {allowLeadingZeroes: true}, false],
    ['   ', {allowLeadingZeroes: true}, false],
    ['', {allowLeadingZeroes: true}, false],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Valid integer should be true (Use options min and max)', () => {
  test.each([
    ['15', {min: 10}, true],
    ['80', {min: 10}, true],
    ['99', {min: 10}, true],
    ['15', {min: 10, max: 15}, true],
    ['11', {min: 10, max: 15}, true],
    ['13', {min: 10, max: 15}, true],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Invalid integer should be false (Use options min and max)', () => {
  test.each([
    ['9', {min: 10}, false],
    ['6', {min: 10}, false],
    ['3.2', {min: 10}, false],
    ['a', {min: 10}, false],
    ['9', {min: 10, max: 15}, false],
    ['2', {min: 10, max: 15}, false],
    ['17', {min: 10, max: 15}, false],
    ['3.2', {min: 10, max: 15}, false],
    ['33', {min: 10, max: 15}, false],
    ['a', {min: 10, max: 15}, false],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Valid integer should be true (Use options gt and lt)', () => {
  test.each([
    ['14', {gt: 10, lt: 15}, true],
    ['11', {gt: 10, lt: 15}, true],
    ['13', {gt: 10, lt: 15}, true],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});

describe('Invalid integer should be false (Use options gt and lt)', () => {
  test.each([
    ['10', {gt: 10, lt: 15}, false],
    ['15', {gt: 10, lt: 15}, false],
    ['17', {gt: 10, lt: 15}, false],
    ['3.2', {gt: 10, lt: 15}, false],
    ['33', {gt: 10, lt: 15}, false],
    ['a', {gt: 10, lt: 15}, false],
  ])('isInt("%s", %s) = %s', (a, b, expected) => {
    expect(isInt(a, b)).toBe(expected);
  });
});