const {validators: {isBefore}} = require('../../dist/build.common');

// Time difference from UTC.
const timeDifference = 9;

describe('Should be true for dates before the specified date', () => {
  test.each([
    ['2023-09-04', '2023-09-05', true],
    // Note: The month in the second parameter of new Date starts from 0 (Jan).
    // Also, since my environment has a time difference of 9 hours, I set 9 hours in the fourth parameter of new Date to prevent the date from being out of sync.
    ['2023-09-04', new Date(2023, 8, 5, timeDifference).toString(), true],
  ])('isBefore("%s", "%s") = %s', (a, b, expected) => {
    expect(isBefore(a, b)).toBe(expected);
  });
});

describe('Should be false if the date is the same as the specified date', () => {
  test.each([
    ['2023-09-04', '2023-09-04', false],
    ['2023-09-04', new Date(2023, 8, 4, timeDifference).toString(), false],
  ])('isBefore("%s", "%s") = %s', (a, b, expected) => {
    expect(isBefore(a, b)).toBe(expected);
  });
});

describe('Date after the specified date should be false', () => {
  test.each([
    ['2023-09-04', '2023-09-03', false],
    ['2023-09-04', new Date(2023, 8, 3, timeDifference).toString(), false],
  ])('isBefore("%s", "%s") = %s', (a, b, expected) => {
    expect(isBefore(a, b)).toBe(expected);
  });
});