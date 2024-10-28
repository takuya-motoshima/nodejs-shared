const {validators: {isLength}} = require('../../dist/build.common');

describe('Valid length should be true', () => {
  test.each([
    ['abc', {min: 2}, true],
    ['de', {min: 2}, true],
    ['abcd', {min: 2}, true],
    ['abc', {min: 2, max: 3}, true],
    ['de', {min: 2, max: 3}, true],
    ['干𩸽', {min: 2, max: 3}, true],
    ['𠮷野家', {min: 2, max: 3}, true],
    ['abc', {max: 3}, true],
    ['de', {max: 3}, true],
    ['a', {max: 3}, true],
    ['', {max: 3}, true],
    ['', {max: 0}, true],
    ['a', {}, true],
    ['', {}, true],
    ['asds', {}, true],
    ['👩🦰👩👩👦👦🏳️🌈', {max: 8}, true],
    ['⏩︎⏩︎⏪︎⏪︎⏭︎⏭︎⏮︎⏮︎', {max: 8}, true],
  ])('isLength("%s", %s) = %s', (a, b, expected) => {
    expect(isLength(a, b)).toBe(expected);
  });
});

describe('Invalid length should be false', () => {
  test.each([
    ['', {min: 2}, false],
    ['a', {min: 2}, false],
    ['', {min: 2, max: 3}, false],
    ['a', {min: 2, max: 3}, false],
    ['abcd', {min: 2, max: 3}, false],
    ['', {min: 2, max: 3}, false],
    ['𠀋', {min: 2, max: 3}, false],
    ['千竈通り', {min: 2, max: 3}, false],
    ['abcd', {max: 3}, false],
    ['a', {max: 0}, false],
    ['ab', {max: 0}, false],
  ])('isLength("%s", %s) = %s', (a, b, expected) => {
    expect(isLength(a, b)).toBe(expected);
  });
});