const {validators: {isFQDN}} = require('../../dist/build.common');
const readCSV  = require('../support/readCSV');

const validFQDN = readCSV('fqdn.csv');
const validFQDNNoTld = readCSV('fqdn-no-tld.csv');
const validFQDNWildcard = readCSV('fqdn-wildcard.csv');
const invalidFQDN = readCSV('fqdn-invalid.csv');

describe('Valid FQDN should be true', () => {
  const table = validFQDN.map(item => ([item, {}, true]));
  test.each(table)('isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN should be false', () => {
  const table = invalidFQDN.map(item => ([item, {}, false]));
  test.each(table)('isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN without TLD should be true', () => {
  const table = validFQDNNoTld.map(item => ([item, {requireFQDNTld: false}, true]));
  test.each(table)('isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});

describe('Valid FQDN with wildcard should be true', () => { 
  const table = validFQDNWildcard.map(item => ([item, {allowFQDNWildcard: true}, true]));
  test.each(table)('isFQDN("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDN(a, b)).toBe(expected);
  });
});