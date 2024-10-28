const {validators: {isDate}} = require('../../dist/build.common');

describe('Valid date should be true', () => {
  test.each([
    [new Date(), {}, true],
    [new Date([2014, 2, 15]), {}, true],
    [new Date('2014-03-15'), {}, true],
    ['2020/02/29', {}, true],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Invalid date should be false', () => {
  test.each([
    ['', {}, false],
    ['15072002', {}, false],
    [null, {}, false],
    [undefined, {}, false],
    [{year: 2002, month: 7, day: 15}, {}, false],
    [42, {}, false],
    [{toString() {return '[object Date]';}}, {}, false], // faking
    ['2020-02-30', {}, false], // invalid date
    ['2019-02-29', {}, false], // non-leap year
    ['2020-04-31', {}, false], // invalid date
    ['2020/03-15', {}, false], // mixed delimiter
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Valid date should be true (Use format option)', () => {
  test.each([
    ['15-07-2002', {format: 'DD/MM/YYYY'}, true],
    ['15/07/2002', {format: 'DD/MM/YYYY'}, true],
    ['15-07-02', {format: 'DD/MM/YY'}, true],
    ['15/07/02', {format: 'DD/MM/YY'}, true],
    ['5-7-02', {format: 'D/M/YY'}, true],
    ['5/7/02', {format: 'D/M/YY'}, true],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Invalid date should be false (Use format option)', () => {
  test.each([
    ['15/7/2002', {format: 'DD/MM/YYYY'}, false],
    ['15-7-2002', {format: 'DD/MM/YYYY'}, false],
    ['15/7/02', {format: 'DD/MM/YYYY'}, false],
    ['15-7-02', {format: 'DD/MM/YYYY'}, false],
    ['15-07/2002', {format: 'DD/MM/YYYY'}, false],
    ['15/7/2002', {format: 'DD/MM/YY'}, false],
    ['15-7-2002', {format: 'DD/MM/YY'}, false],
    ['15/07-02', {format: 'DD/MM/YY'}, false],
    ['30/04/--', {format: 'DD/MM/YY'}, false],
    ['5/07/02', {format: 'D/M/YY'}, false],
    ['15/7/02', {format: 'D/M/YY'}, false],
    ['15-7-02', {format: 'D/M/YY'}, false],
    ['5/7-02', {format: 'D/M/YY'}, false],
    ['3/4/aa', {format: 'D/M/YY'}, false],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Valid date should be true (Use strictMode option = true)', () => {
  test.each([
    ['2020/01/15', {strictMode: true}, true],
    ['2014/02/15', {strictMode: true}, true],
    ['2014/03/15', {strictMode: true}, true],
    ['2020/02/29', {strictMode: true}, true],
    ['15/07/2002', {format: 'DD/MM/YYYY', strictMode: true}, true],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Invalid date should be false (Use strictMode option = true)', () => {
  test.each([
    ['2014-02-15', {strictMode: true}, false],
    ['2020-02-29', {strictMode: true}, false],
    ['15-07/2002', {strictMode: true}, false],
    [new Date(), {strictMode: true}, false],
    [new Date([2014, 2, 15]), {strictMode: true}, false],
    [new Date('2014-03-15'), {strictMode: true}, false],
    ['15-07-2002', {format: 'DD/MM/YYYY', strictMode: true}, false],
    ['15/7/2002', {format: 'DD/MM/YYYY', strictMode: true}, false],
    ['15-7-2002', {format: 'DD/MM/YYYY', strictMode: true}, false],
    ['15/7/02', {format: 'DD/MM/YYYY', strictMode: true}, false],
    ['15-7-02', {format: 'DD/MM/YYYY', strictMode: true}, false],
    ['15-07/2002', {format: 'DD/MM/YYYY', strictMode: true}, false],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Valid date should be true (Use delimiters option)', () => {
  test.each([
    [new Date(), {delimiters: ['/', ' ']}, true],
    [new Date([2014, 2, 15]), {delimiters: ['/', ' ']}, true],
    [new Date('2014-03-15'), {delimiters: ['/', ' ']}, true],
    ['2020/02/29', {delimiters: ['/', ' ']}, true],
    ['2020 02 29', {delimiters: ['/', ' ']}, true],
    ['01.15.2020', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, true],
    ['02.15.2014', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, true],
    ['03.15.2014', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, true],
    ['02.29.2020', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, true],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});

describe('Invalid date should be false (Use delimiters option)', () => {
  test.each([
    ['2020-02-29', {delimiters: ['/', ' ']}, false],
    ['', {delimiters: ['/', ' ']}, false],
    ['15072002', {delimiters: ['/', ' ']}, false],
    [null, {delimiters: ['/', ' ']}, false],
    [undefined, {delimiters: ['/', ' ']}, false],
    [{ year: 2002, month: 7, day: 15 }, {delimiters: ['/', ' ']}, false],
    [42, {delimiters: ['/', ' ']}, false],
    [{ toString() { return '[object Date]'; } }, {delimiters: ['/', ' ']}, false],
    ['2020/02/30', {delimiters: ['/', ' ']}, false],
    ['2019/02/29', {delimiters: ['/', ' ']}, false],
    ['2020/04/31', {delimiters: ['/', ' ']}, false],
    ['2020/03-15', {delimiters: ['/', ' ']}, false],
    ['2014-02-15', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    ['2020-02-29', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    ['15-07/2002', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    [new Date(), {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    [new Date([2014, 2, 15]), {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    [new Date('2014-03-15'), {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
    ['29.02.2020', {format: 'MM.DD.YYYY', delimiters: ['.'], strictMode: true}, false],
  ])('isDate("%s", %s) = %s', (a, b, expected) => {
    expect(isDate(a, b)).toBe(expected);
  });
});