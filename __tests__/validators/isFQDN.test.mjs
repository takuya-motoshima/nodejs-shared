import {validators} from '../../dist/build.mjs';
import readCsvColumn from '../support/readCsvColumn.mjs';

const validFqdns = readCsvColumn('valid-fqdns.csv');
const invalidFqdns = readCsvColumn('invalid-fqdns.csv');
const validFqdnsNoTld = readCsvColumn('valid-fqdns-without-tld.csv');
const validFqdnsWildcard = readCsvColumn('valid-fqdns-with-wildcard.csv');

describe('with valid FQDNs', () => {
  test.each(validFqdns)('validators.isFQDN("%s") should return true', received => {
    expect(validators.isFQDN(received)).toBe(true);
  });
});

describe('with invalid FQDNs', () => {
  test.each(invalidFqdns)('validators.isFQDN("%s") should return false', received => {
    expect(validators.isFQDN(received)).toBe(false);
  });
});

describe('with valid FQDNs without TLD', () => {
  test.each(validFqdnsNoTld)('validators.isFQDN("%s", {requireTld: false}) should return true', received => {
    expect(validators.isFQDN(received, {requireTld: false})).toBe(true);
  });
});

describe('with valid FQDNs with wildcard', () => {
  test.each(validFqdnsWildcard)('validators.isFQDN("%s", {allowWildcard: true}) should return true', received => {
    expect(validators.isFQDN(received, {allowWildcard: true})).toBe(true);
  });
});