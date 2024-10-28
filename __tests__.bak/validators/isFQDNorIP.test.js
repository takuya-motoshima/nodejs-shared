const {validators: {isFQDNorIP}} = require('../../dist/build.common');
const readCSV  = require('../support/readCSV');

const validFQDN = readCSV('fqdn.csv');
const validIPv4 = readCSV('ipv4.csv');
const validIPv6 = readCSV('ipv6.csv');
const validIPv4Range = readCSV('ipv4-range.csv');
const validIPv6Range = readCSV('ipv6-range.csv');
const invalidFQDN = readCSV('fqdn-invalid.csv');
const invalidIPv4Or6 = readCSV('ip-invalid.csv');
const invalidIPv4 = readCSV('ipv4-invalid.csv');
const invalidIPv6 = readCSV('ipv6-invalid.csv');

describe('Valid FQDN, IP should be true', () => {
  const table = [...validFQDN, ...validIPv4, ...validIPv6].map(item => ([item, {}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IP should be false', () => {
  const table = [...invalidFQDN, ...invalidIPv4Or6, ...validIPv4Range, ...validIPv6Range].map(item => ([item, {}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv4 should be true', () => {
  const table = [...validFQDN, ...validIPv4].map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv4 should be false', () => {
  const table = [...invalidFQDN, ...invalidIPv4, ...validIPv4Range].map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Valid FQDN, IPv6 should be true', () => {
  const table = [...validFQDN, ...validIPv6].map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});

describe('Invalid FQDN, IPv6 should be false', () => {
  const table = [...invalidFQDN, ...invalidIPv6, ...validIPv6Range].map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('isFQDNorIP("%s", %s) = %s', (a, b, expected) => {
    expect(isFQDNorIP(a, b)).toBe(expected);
  });
});
