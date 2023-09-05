const {validators: {isAlpha}} = require('../../dist/build.common');

describe('Valid alphabets should be true', () => {
  test.each([
    ['abc', {}, true],
    ['ABC', {}, true],
    ['FoObar', {}, true],
  ])('isAlpha("%s", %s) = %s', (a, b, expected) => {
    expect(isAlpha(a, b)).toBe(expected);
  });
});

describe('Invalid alphabets should be false', () => {
  test.each([
    ['abc1', {}, false],
    ['  foo  ', {}, false],
    ['', {}, false],
    ['ÄBC', {}, false],
    ['FÜübar', {}, false],
    ['Jön', {}, false],
    ['Heiß', {}, false],
  ])('isAlpha("%s", %s) = %s', (a, b, expected) => {
    expect(isAlpha(a, b)).toBe(expected);
  });
});

describe('Valid alphabets should be true (Use ignore option)', () => {
  test.each([
    ['en-US', {ignore: '- /'}, true],
    ['this is a valid alpha string', {ignore: '- /'}, true],
    ['us/usa', {ignore: '- /'}, true],
    ['en-US', {ignore: /[\s/-]/g}, true],
    ['this is a valid alpha string', {ignore: /[\s/-]/g}, true],
    ['us/usa', {ignore: /[\s/-]/g}, true],
  ])('isAlpha("%s", %s) = %s', (a, b, expected) => {
    expect(isAlpha(a, b)).toBe(expected);
  });
});

describe('Invalid alphabets should be false (Use ignore option)', () => {
  test.each([
    ['1. this is not a valid alpha string', {ignore: '- /'}, false],
    ['this$is also not a valid.alpha string', {ignore: '- /'}, false],
    ['this is also not a valid alpha string.', {ignore: '- /'}, false],
    ['1. this is not a valid alpha string', {ignore: /[\s/-]/g}, false],
    ['this$is also not a valid.alpha string', {ignore: /[\s/-]/g}, false],
    ['this is also not a valid alpha string.', {ignore: /[\s/-]/g}, false],
  ])('isAlpha("%s", %s) = %s', (a, b, expected) => {
    expect(isAlpha(a, b)).toBe(expected);
  });
});