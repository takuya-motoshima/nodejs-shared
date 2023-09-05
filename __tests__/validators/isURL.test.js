const {validators: {isURL}} = require('../../dist/build.common');
const readCSV  = require('../support/readCSV');

const validURL = readCSV('valid-url.csv');
const validURLNoTld = readCSV('valid-url-no-tld.csv');
const validURLWildcard = readCSV('valid-url-wildcard.csv');
const invalidURL = readCSV('invalid-url.csv');

describe('Valid URL should be true', () => {
  const table = validURL.map(item => ([item, {}, true]));
  test.each(table)('isURL("%s", %s) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Invalid URL should be false', () => {
  const table = invalidURL.map(item => ([item, {}, false]));
  test.each(table)('isURL("%s", %s) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL without TLD should be false', () => {
  const table = validURLNoTld.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('isURL("%s", %s) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});

describe('Valid URL with wildcard should be true', () => {
  const table = validURLWildcard.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('isURL("%s", %s) = %s', (a, b, expected) => {
    expect(isURL(a, b)).toBe(expected);
  });
});