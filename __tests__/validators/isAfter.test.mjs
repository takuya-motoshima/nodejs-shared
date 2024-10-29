import {validators} from '../../dist/build.mjs';

// Get the current time difference in hours (assuming your system is configured to your local time)
const timeDifference = new Date().getTimezoneOffset() / -60; 

test.each([
  ['2023-09-04', '2023-09-03', true],
  ['2023-09-04', new Date(2023, 8, 3, timeDifference).toString(), true],
  ['2023-09-04', '2023-09-04', false],
  ['2023-09-04', new Date(2023, 8, 4, timeDifference).toString(), false],
  ['2023-09-04', '2023-09-05', false],
  ['2023-09-04', new Date(2023, 8, 5, timeDifference).toString(), false],
])('validators.isAfter("%s", "%s") should return %s', (received, comparisonDate, expected) => {
  expect(validators.isAfter(received, comparisonDate)).toBe(expected);
});