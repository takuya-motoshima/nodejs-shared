import {validators} from '../../dist/build.mjs';
import readCsvColumn from '../support/readCsvColumn.mjs';

const validFqdns = readCsvColumn('valid-fqdns.csv');
const validIpv4s = readCsvColumn('valid-ipv4-addresses.csv');
const validIpv6s = readCsvColumn('valid-ipv6-addresses.csv');
const invalidFqdns = readCsvColumn('invalid-fqdns.csv');
const invalidIpv4s = readCsvColumn('invalid-ipv4-addresses.csv');
const invalidIpv6s = readCsvColumn('invalid-ipv6-addresses.csv');
const invalidIpAddresses = readCsvColumn('invalid-ip-addresses.csv');
const validIpv4Ranges = readCsvColumn('valid-ipv4-ranges.csv');
const validIpv6Ranges = readCsvColumn('valid-ipv6-ranges.csv');

describe('with valid FQDNs and IPs', () => {
  test.each([...validFqdns, ...validIpv4s, ...validIpv6s])(
    'validators.isFQDNorIP("%s") should return true',
    received => {
      expect(validators.isFQDNorIP(received)).toBe(true);
    }
  );
});

describe('with invalid FQDNs and IPs', () => {
  test.each([...invalidFqdns, ...invalidIpAddresses])(
    'validators.isFQDNorIP("%s") should return false',
    received => {
      expect(validators.isFQDNorIP(received)).toBe(false);
    }
  );
});

describe('with IP ranges', () => {
  test.each([...validIpv4Ranges, ...validIpv6Ranges])(
    'validators.isFQDNorIP("%s") should return false',
    received => {
      expect(validators.isFQDNorIP(received)).toBe(false);
    }
  );
});

describe('with version option', () => {
  describe('IPv4', () => {
    test.each([...validFqdns, ...validIpv4s])(
      'validators.isFQDNorIP("%s", {version: 4}) should return true',
      received => {
        expect(validators.isFQDNorIP(received, {version: 4})).toBe(true);
      }
    );

    test.each([...invalidFqdns, ...invalidIpv4s, ...validIpv4Ranges])(
      'validators.isFQDNorIP("%s", {version: 4}) should return false',
      received => {
        expect(validators.isFQDNorIP(received, {version: 4})).toBe(false);
      }
    );
  });

  describe('IPv6', () => {
    test.each([...validFqdns, ...validIpv6s])(
      'validators.isFQDNorIP("%s", {version: 6}) should return true',
      received => {
        expect(validators.isFQDNorIP(received, {version: 6})).toBe(true);
      }
    );

    test.each([...invalidFqdns, ...invalidIpv6s, ...validIpv6Ranges])(
      'validators.isFQDNorIP("%s", {version: 6}) should return false',
      received => {
        expect(validators.isFQDNorIP(received, {version: 6})).toBe(false);
      }
    );
  });
});