const {validators: {isIn}} = require('../../dist/build.common');

describe('Valid values in the list should be true (Use string for options)', () => {
  test.each([
    ['foo', 'foobar', true],
    ['bar', 'foobar', true],
    ['foobar', 'foobar', true],
    ['', 'foobar', true],
    ['foobar', 'foobar', true],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});

describe('Invalid values in the list should be false (Use string for options)', () => {
  test.each([
    ['foobarbaz', 'foobar', false],
    ['barfoo', 'foobar', false],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});

describe('Valid values in the list should be true (Use array for options)', () => {
  test.each([
    ['foo', ['foo', 'bar'], true],
    ['bar', ['foo', 'bar'], true],
    ['1', ['1', '2', '3'], true],
    ['2', ['1', '2', '3'], true],
    ['3', ['1', '2', '3'], true],
    ['1', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
    ['2', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
    ['3', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
    ['', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});

describe('Invalid values in the list should be false (Use array for options)', () => {
  test.each([
    ['foobar', ['foo', 'bar'], false],
    ['barfoo', ['foo', 'bar'], false],
    ['', ['foo', 'bar'], false],
    ['4', ['1', '2', '3'], false],
    ['', ['1', '2', '3'], false],
    ['4', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], false],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});

describe('Valid values in the list should be true (Use object for options)', () => {
  test.each([
    ['foo', {foo: 1, bar: 2, foobar: 3}, true],
    ['bar', {foo: 1, bar: 2, foobar: 3}, true],
    ['foobar', {foo: 1, bar: 2, foobar: 3}, true],
    ['1', {1: 3, 2: 0, 3: 1}, true],
    ['2', {1: 3, 2: 0, 3: 1}, true],
    ['3', {1: 3, 2: 0, 3: 1}, true],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});

describe('Invalid values in the list should be false (Use object for options)', () => {
  test.each([
    ['foobarbaz', {foo: 1, bar: 2, foobar: 3}, false],
    ['barfoo', {foo: 1, bar: 2, foobar: 3}, false],
    ['', {foo: 1, bar: 2, foobar: 3}, false],
    ['4', {1: 3, 2: 0, 3: 1}, false],
    ['', {1: 3, 2: 0, 3: 1}, false],
  ])('isIn("%s", %s) = %s', (a, b, expected) => {
    expect(isIn(a, b)).toBe(expected);
  });
});