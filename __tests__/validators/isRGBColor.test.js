const {validators: {isRGBColor}} = require('../../dist/build.common');

describe('Valid RGB color should be true', () => {
  test.each([
    ['rgb(0,0,0)', {}, true],
    ['rgb(255,255,255)', {}, true],
    ['rgba(0,0,0,0)', {}, true],
    ['rgba(255,255,255,1)', {}, true],
    ['rgba(255,255,255,.1)', {}, true],
    ['rgba(255,255,255,0.1)', {}, true],
    ['rgb(5%,5%,5%)', {}, true],
    ['rgba(5%,5%,5%,.3)', {}, true],
  ])('isRGBColor("%s") = %s', (a, b, expected) => {
    expect(isRGBColor(a, b)).toBe(expected);
  });
});

describe('Invalid RGB color should be false', () => {
  test.each([
    ['rgb(0,0,0,)', {}, false],
    ['rgb(0,0,)', {}, false],
    ['rgb(0,0,256)', {}, false],
    ['rgb()', {}, false],
    ['rgba(0,0,0)', {}, false],
    ['rgba(255,255,255,2)', {}, false],
    ['rgba(255,255,255,.12)', {}, false],
    ['rgba(255,255,256,0.1)', {}, false],
    ['rgb(4,4,5%)', {}, false],
    ['rgba(5%,5%,5%)', {}, false],
    ['rgba(3,3,3%,.3)', {}, false],
    ['rgb(101%,101%,101%)', {}, false],
    ['rgba(3%,3%,101%,0.3)', {}, false],
    ['rgb(101%,101%,101%) additional invalid string part', {}, false],
    ['rgba(3%,3%,101%,0.3) additional invalid string part', {}, false],
  ])('isRGBColor("%s") = %s', (a, b, expected) => {
    expect(isRGBColor(a, b)).toBe(expected);
  });
});

describe('Valid RGB color should be true (Use includePercentValues option = false)', () => {
  test.each([
    ['rgb(5,5,5)', {includePercentValues: false}, true],
    ['rgba(5,5,5,.3)', {includePercentValues: false}, true],
  ])('isRGBColor("%s") = %s', (a, b, expected) => {
    expect(isRGBColor(a, b)).toBe(expected);
  });
});

describe('Invalid RGB color should be false (Use includePercentValues option = false)', () => {
  test.each([
    ['rgb(4,4,5%)', {includePercentValues: false}, false],
    ['rgba(5%,5%,5%)', {includePercentValues: false}, false],
  ])('isRGBColor("%s") = %s', (a, b, expected) => {
    expect(isRGBColor(a, b)).toBe(expected);
  });
});