import {validators} from '../../dist/build.mjs';

test.each([
  ['foo', 'foobar', true],
  ['bar', 'foobar', true],
  ['foobar', 'foobar', true],
  ['', 'foobar', true],
  ['foobar', 'foobar', true],
  ['foobarbaz', 'foobar', false],
  ['barfoo', 'foobar', false],
  ['foo', ['foo', 'bar'], true],
  ['bar', ['foo', 'bar'], true],
  ['1', ['1', '2', '3'], true],
  ['2', ['1', '2', '3'], true],
  ['3', ['1', '2', '3'], true],
  ['1', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
  ['2', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
  ['3', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
  ['', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], true],
  ['foobar', ['foo', 'bar'], false],
  ['barfoo', ['foo', 'bar'], false],
  ['', ['foo', 'bar'], false],
  ['4', ['1', '2', '3'], false],
  ['', ['1', '2', '3'], false],
  ['4', ['1', '2', '3', {foo: 'bar'}, () => 5, {toString: 'test'}], false],
  ['foo', {foo: 1, bar: 2, foobar: 3}, true],
  ['bar', {foo: 1, bar: 2, foobar: 3}, true],
  ['foobar', {foo: 1, bar: 2, foobar: 3}, true],
  ['1', {1: 3, 2: 0, 3: 1}, true],
  ['2', {1: 3, 2: 0, 3: 1}, true],
  ['3', {1: 3, 2: 0, 3: 1}, true],
  ['foobarbaz', {foo: 1, bar: 2, foobar: 3}, false],
  ['barfoo', {foo: 1, bar: 2, foobar: 3}, false],
  ['', {foo: 1, bar: 2, foobar: 3}, false],
  ['4', {1: 3, 2: 0, 3: 1}, false],
  ['', {1: 3, 2: 0, 3: 1}, false],
])('validators.isIn("%s", "%s") should return %s', (received, values, expected) => {
  expect(validators.isIn(received, values)).toBe(expected);
});