import {validators} from '../../dist/build.mjs';
import readCsvColumn from '../support/readCsvColumn.mjs';

// Data loading (using the new function name)
const validUrls = readCsvColumn('valid-urls.csv');
const validUrlsNoTld = readCsvColumn('valid-urls-no-tld.csv');
const validUrlsWildcard = readCsvColumn('valid-urls-wildcard.csv');
const invalidUrls = readCsvColumn('invalid-urls.csv');

describe('Valid URLs', () => {
  test.each(validUrls)(
    'validators.isURL("%s") should return true',
    received => {
      expect(validators.isURL(received)).toBe(true);
    }
  );
});

describe('Invalid URLs', () => {
  test.each(invalidUrls)(
    'validators.isURL("%s") should return false',
    received => {
      expect(validators.isURL(received)).toBe(false);
    }
  );
});

describe('Valid URLs (no TLD)', () => {
  test.each(validUrlsNoTld)(
    'validators.isURL("%s", {requireTld: false}) should return true',
    received => {
      expect(validators.isURL(received, {requireTld: false})).toBe(true);
    }
  );
});

describe('Valid URLs (wildcard)', () => {
  test.each(validUrlsWildcard)(
    'validators.isURL("%s", {allowWildcard: true}) should return true',
    received => {
      expect(validators.isURL(received, {allowWildcard: true})).toBe(true);
    }
  );
});