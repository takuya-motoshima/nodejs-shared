const {validators: {isUUID}} = require('../../dist/build.common');

describe('Valid UUID should be true (All versions)', () => {
  test.each([
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3', true],
    ['A987FBC9-4BED-4078-8F07-9141BA07C9F3', true],
    ['A987FBC9-4BED-5078-AF07-9141BA07C9F3', true],
  ])('isUUID("%s") = %s', (a, expected) => {
    expect(isUUID(a)).toBe(expected);
  });
});

describe('Invalid UUID should be false (All versions)', () => {
  test.each([
    ['', false],
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', false],
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx', false],
    ['A987FBC94BED3078CF079141BA07C9F3', false],
    ['934859', false],
    ['987FBC9-4BED-3078-CF07A-9141BA07C9F3', false],
    ['AAAAAAAA-1111-1111-AAAG-111111111111', false],
  ])('isUUID("%s") = %s', (a, expected) => {
    expect(isUUID(a)).toBe(expected);
  });
});

describe('Valid UUID should be true (Version 1)', () => {
  test.each([
    ['E034B584-7D89-11E9-9669-1AECF481A97B', 1, true],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 1)', () => {
  test.each([
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', 1, false],
    ['AAAAAAAA-1111-2222-AAAG', 1, false],
    ['AAAAAAAA-1111-2222-AAAG-111111111111', 1, false],
    ['A987FBC9-4BED-4078-8F07-9141BA07C9F3', 1, false],
    ['A987FBC9-4BED-5078-AF07-9141BA07C9F3', 1, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Valid UUID should be true (Version 2)', () => {
  test.each([
    ['A987FBC9-4BED-2078-CF07-9141BA07C9F3', 2, true],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 2)', () => {
  test.each([
    ['', 2, false],
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', 2, false],
    ['11111', 2, false],
    ['AAAAAAAA-1111-1111-AAAG-111111111111', 2, false],
    ['A987FBC9-4BED-4078-8F07-9141BA07C9F3', 2, false],
    ['A987FBC9-4BED-5078-AF07-9141BA07C9F3', 2, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Valid UUID should be true (Version 3)', () => {
  test.each([
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3', 3, true],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 3)', () => {
  test.each([
    ['', 3, false],
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', 3, false],
    ['934859', 3, false],
    ['AAAAAAAA-1111-1111-AAAG-111111111111', 3, false],
    ['A987FBC9-4BED-4078-8F07-9141BA07C9F3', 3, false],
    ['A987FBC9-4BED-5078-AF07-9141BA07C9F3', 3, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Valid UUID should be true (Version 4)', () => {
  test.each([
    ['713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', 4, true],
    ['625e63f3-58f5-40b7-83a1-a72ad31acffb', 4, true],
    ['57b73598-8764-4ad0-a76a-679bb6640eb1', 4, true],
    ['9c858901-8a57-4791-81fe-4c455b099bc9', 4, true],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 4)', () => {
  test.each([
    ['', 4, false],
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', 4, false],
    ['934859', 4, false],
    ['AAAAAAAA-1111-1111-AAAG-111111111111', 4, false],
    ['A987FBC9-4BED-5078-AF07-9141BA07C9F3', 4, false],
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3', 4, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Valid UUID should be true (Version 5)', () => {
  test.each([
    ['987FBC97-4BED-5078-AF07-9141BA07C9F3', 5, true],
    ['987FBC97-4BED-5078-BF07-9141BA07C9F3', 5, true],
    ['987FBC97-4BED-5078-8F07-9141BA07C9F3', 5, true],
    ['987FBC97-4BED-5078-9F07-9141BA07C9F3', 5, true],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 5)', () => {
  test.each([
    ['', 5, false],
    ['xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', 5, false],
    ['934859', 5, false],
    ['AAAAAAAA-1111-1111-AAAG-111111111111', 5, false],
    ['9c858901-8a57-4791-81fe-4c455b099bc9', 5, false],
    ['A987FBC9-4BED-3078-CF07-9141BA07C9F3', 5, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});

describe('Invalid UUID should be false (Version 6)', () => {
  test.each([
    ['987FBC97-4BED-1078-AF07-9141BA07C9F3', 6, false],
    ['987FBC97-4BED-2078-AF07-9141BA07C9F3', 6, false],
    ['987FBC97-4BED-3078-AF07-9141BA07C9F3', 6, false],
    ['987FBC97-4BED-4078-AF07-9141BA07C9F3', 6, false],
    ['987FBC97-4BED-5078-AF07-9141BA07C9F3', 6, false],
  ])('isUUID("%s", "%s") = %s', (a, b, expected) => {
    expect(isUUID(a, b)).toBe(expected);
  });
});