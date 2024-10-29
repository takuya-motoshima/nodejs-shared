import {validators} from '../../dist/build.mjs';

test.each([
  ['{"key": "value"}', {}, true],
  ['{}', {}, true],
  ['{key: "value"}', {}, false],
  ['{\'key\': \'value\'}', {}, false],
  ['null', {}, false],
  ['1234', {}, false],
  ['"nope"', {}, false],
  ['{"key": "value"}', {allowPrimitives: true}, true],
  ['{}', {allowPrimitives: true}, true],
  ['null', {allowPrimitives: true}, true],
  ['false', {allowPrimitives: true}, true],
  ['true', {allowPrimitives: true}, true],
  ['{key: "value"}', {allowPrimitives: true}, false],
  ['{\'key\': \'value\'}', {allowPrimitives: true}, false],
  ['{"key": value}', {allowPrimitives: true}, false],
  ['1234', {allowPrimitives: true}, false],
  ['"nope"', {allowPrimitives: true}, false],
])('validators.isJSON("%s", %s) should return %s', (received, options, expected) => {
  expect(validators.isJSON(received, options)).toBe(expected);
});