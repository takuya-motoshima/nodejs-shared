import {validators} from '../../dist/build.mjs';

test.each([
  ['true', {}, true],
  ['false', {}, true],
  ['0', {}, true],
  ['1', {}, true],
  ['1.0', {}, false],
  ['0.0', {}, false],
  ['true ', {}, false],
  ['False', {}, false],
  ['True', {}, false],
  ['yes', {}, false],
  ['true', {loose: true}, true],
  ['True', {loose: true}, true],
  ['TRUE', {loose: true}, true],
  ['false', {loose: true}, true],
  ['False', {loose: true}, true],
  ['FALSE', {loose: true}, true],
  ['0', {loose: true}, true],
  ['1', {loose: true}, true],
  ['yes', {loose: true}, true],
  ['Yes', {loose: true}, true],
  ['YES', {loose: true}, true],
  ['no', {loose: true}, true],
  ['No', {loose: true}, true],
  ['NO', {loose: true}, true],
  ['1.0', {loose: false}, false],
  ['0.0', {loose: false}, false],
  ['true ', {loose: false}, false],
  [' false', {loose: false}, false],
])('validators.isBoolean("%s", "%s") should return %s', (received, optipns, expected) => {
  expect(validators.isBoolean(received, optipns)).toBe(expected);
});