const {validators: {isIP}} = require('../../dist/build.common');
const readCSV  = require('../support/readCSV');

const validIPv4 = readCSV('ipv4.csv');
const validIPv6 = readCSV('ipv6.csv');
const validIPv4Range = readCSV('ipv4-range.csv');
const validIPv6Range = readCSV('ipv6-range.csv');
const invalidIPv4Or6 = readCSV('ip-invalid.csv');
const invalidIPv4 = readCSV('ipv4-invalid.csv');
const invalidIPv6 = readCSV('ipv6-invalid.csv');
const invalidIPv4Or6Range = readCSV('ip-range-invalid.csv');
const invalidIPv4Range = readCSV('ipv4-range-invalid.csv');
const invalidIPv6Range = readCSV('ipv6-range-invalid.csv');

describe('Valid IPv4, IPv6 should be true', () => {
  const table = [...validIPv4, ...validIPv6].map(item => ([item, {}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 should be false', () => {
  const table = invalidIPv4Or6.map(item => ([item, {}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 should be true', () => {
  const table = validIPv4.map(item => ([item, {ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 should be false', () => {
  const table = invalidIPv4.map(item => ([item, {ipVersion: 4}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 should be true', () => {
  const table = validIPv6.map(item => ([item, {ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 should be false', () => {
  const table = invalidIPv6.map(item => ([item, {ipVersion: 6}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv6 range should be true', () => {
  const table = [...validIPv4Range, ...validIPv6Range].map(item => ([item, {allowIPRange: true}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4, IPv6 range should be false', () => {
  const table = invalidIPv4Or6Range.map(item => ([item, {allowIPRange: true}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4 range should be true', () => {
  const table = validIPv4Range.map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv4 range should be false', () => {
  const table = invalidIPv4Range.map(item => ([item, {allowIPRange: true, ipVersion: 4}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6 range should be true', () => {
  const table = validIPv6Range.map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Invalid IPv6 range should be false', () => {
  const table = invalidIPv6Range.map(item => ([item, {allowIPRange: true, ipVersion: 6}, false]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv4, IPv4 range should be true', () => {
  const table = [...validIPv4, ...validIPv4Range].map(item => ([item, {allowIPRange: true, ipVersion: 4}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});

describe('Valid IPv6, IPv6 range should be true', () => {
  const table = [...validIPv6, ...validIPv6Range].map(item => ([item, {allowIPRange: true, ipVersion: 6}, true]));
  test.each(table)('isIP("%s", %s) = %s', (a, b, expected) => {
    expect(isIP(a, b)).toBe(expected);
  });
});