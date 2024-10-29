import {validators} from '../../dist/build.mjs';
import readCsvColumn from '../support/readCsvColumn.mjs';

const validIpv4s = readCsvColumn('valid-ipv4-addresses.csv');
const validIpv6s = readCsvColumn('valid-ipv6-addresses.csv');
const validIpv4Ranges = readCsvColumn('valid-ipv4-ranges.csv');
const validIpv6Ranges = readCsvColumn('valid-ipv6-ranges.csv');
const invalidIpAddresses = readCsvColumn('invalid-ip-addresses.csv');
const invalidIpv4s = readCsvColumn('invalid-ipv4-addresses.csv');
const invalidIpv6s = readCsvColumn('invalid-ipv6-addresses.csv');
const invalidIpRanges = readCsvColumn('invalid-ip-ranges.csv');
const invalidIpv4Ranges = readCsvColumn('invalid-ipv4-ranges.csv');
const invalidIpv6Ranges = readCsvColumn('invalid-ipv6-ranges.csv');

describe('Valid IPv4, IPv6', () => {
  test.each([...validIpv4s, ...validIpv6s])(
    'validators.isIP("%s") should return true',
    received => {
      expect(validators.isIP(received)).toBe(true);
    }
  );
});

describe('Invalid IPv4, IPv6', () => {
  test.each(invalidIpAddresses)(
    'validators.isIP("%s") should return false',
    received => {
      expect(validators.isIP(received)).toBe(false);
    }
  );
});

describe('Valid IPv4', () => {
  test.each(validIpv4s)(
    'validators.isIP("%s", {version: 4}) should return true',
    received => {
      expect(validators.isIP(received, {version: 4})).toBe(true);
    }
  );
});

describe('Invalid IPv4', () => {
  test.each(invalidIpv4s)(
    'validators.isIP("%s", {version: 4}) should return false',
    received => {
      expect(validators.isIP(received, {version: 4})).toBe(false);
    }
  );
});

describe('Valid IPv6', () => {
  test.each(validIpv6s)(
    'validators.isIP("%s" {version: 6}) should return true',
    received => {
      expect(validators.isIP(received, {version: 6})).toBe(true);
    }
  );
});

describe('Invalid IPv6', () => {
  test.each(invalidIpv6s)(
    'validators.isIP("%s", {version: 6}) should return false',
    received => {
      expect(validators.isIP(received, {version: 6})).toBe(false);
    }
  );
});

describe('Valid IPv4, IPv6 range', () => {
  test.each([...validIpv4Ranges, ...validIpv6Ranges])(
    'validators.isIP("%s", {allowRange: true}) should return true',
    received => {
      expect(validators.isIP(received, {allowRange: true})).toBe(true);
    }
  );
});

describe('Invalid IPv4, IPv6 range', () => {
  test.each(invalidIpRanges)(
    'validators.isIP("%s", {allowRange: true}) should return false',
    received => {
      expect(validators.isIP(received, {allowRange: true})).toBe(false);
    }
  );
});

describe('Valid IPv4 range', () => {
  test.each(validIpv4Ranges)(
    'validators.isIP("%s", {allowRange: true, version: 4}) should return true',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 4})).toBe(true);
    }
  );
});

describe('Invalid IPv4 range', () => {
  test.each(invalidIpv4Ranges)(
    'validators.isIP("%s", {allowRange: true, version: 4}) should return false',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 4})).toBe(false);
    }
  );
});

describe('Valid IPv6 range', () => {
  test.each(validIpv6Ranges)(
    'validators.isIP("%s", {allowRange: true, version: 6}) should return true',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 6})).toBe(true);
    }
  );
});

describe('Invalid IPv6 range', () => {
  test.each(invalidIpv6Ranges)(
    'validators.isIP("%s", {allowRange: true, version: 6}) should return false',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 6})).toBe(false);
    }
  );
});

describe('Valid IPv4, IPv4 range', () => {
  test.each([...validIpv4s, ...validIpv4Ranges])(
    'validators.isIP("%s", {allowRange: true, version: 4}) should return true',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 4})).toBe(true);
    }
  );
});

describe('Valid IPv6, IPv6 range', () => {
  test.each([...validIpv6s, ...validIpv6Ranges])(
    'validators.isIP("%s", {allowRange: true, version: 6}) should return true',
    received => {
      expect(validators.isIP(received, {allowRange: true, version: 6})).toBe(true);
    }
  );
});