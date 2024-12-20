import {validators} from '../../dist/build.mjs';

test.each([
  ['123', {}, true],
  ['00123', {}, true],
  ['-00123', {}, true],
  ['0', {}, true],
  ['-0', {}, true],
  ['+123', {}, true],
  ['0.01', {}, true],
  ['.1', {}, true],
  ['1.0', {}, true],
  ['-.25', {}, true],
  ['-0', {}, true],
  ['0.0000000000001', {}, true],
  ['0,01', {}, false],
  [',1', {}, false],
  ['1,0', {}, false],
  ['-,25', {}, false],
  ['0,0000000000001', {}, false],
  ['0٫01', {}, false],
  ['٫1', {}, false],
  ['1٫0', {}, false],
  ['-٫25', {}, false],
  ['0٫0000000000001', {}, false],
  ['....', {}, false],
  [' ', {}, false],
  ['', {}, false],
  ['-', {}, false],
  ['+', {}, false],
  ['.', {}, false],
  ['0.1a', {}, false],
  ['a', {}, false],
  ['\n', {}, false],
  ['0.01', {forceDecimal: true}, true],
  ['.1', {forceDecimal: true}, true],
  ['1.0', {forceDecimal: true}, true],
  ['-.25', {forceDecimal: true}, true],
  ['0.0000000000001', {forceDecimal: true}, true],
  ['-0', {forceDecimal: true}, false],
  ['123', {forceDecimal: true}, false],
  ['00123', {forceDecimal: true}, false],
  ['-00123', {forceDecimal: true}, false],
  ['0', {forceDecimal: true}, false],
  ['-0', {forceDecimal: true}, false],
  ['+123', {forceDecimal: true}, false],
  ['0,0000000000001', {forceDecimal: true}, false],
  ['0,01', {forceDecimal: true}, false],
  [',1', {forceDecimal: true}, false],
  ['1,0', {forceDecimal: true}, false],
  ['-,25', {forceDecimal: true}, false],
  ['....', {forceDecimal: true}, false],
  [' ', {forceDecimal: true}, false],
  ['', {forceDecimal: true}, false],
  ['-', {forceDecimal: true}, false],
  ['+', {forceDecimal: true}, false],
  ['.', {forceDecimal: true}, false],
  ['0.1a', {forceDecimal: true}, false],
  ['a', {forceDecimal: true}, false],
  ['\n', {forceDecimal: true}, false],
  ['123', {decimalDigits: '2,3'}, true],
  ['00123', {decimalDigits: '2,3'}, true],
  ['-00123', {decimalDigits: '2,3'}, true],
  ['0', {decimalDigits: '2,3'}, true],
  ['-0', {decimalDigits: '2,3'}, true],
  ['+123', {decimalDigits: '2,3'}, true],
  ['0.01', {decimalDigits: '2,3'}, true],
  ['1.043', {decimalDigits: '2,3'}, true],
  ['.15', {decimalDigits: '2,3'}, true],
  ['-.255', {decimalDigits: '2,3'}, true],
  ['-0', {decimalDigits: '2,3'}, true],
  ['0.0000000000001', {decimalDigits: '2,3'}, false],
  ['0.0', {decimalDigits: '2,3'}, false],
  ['.1', {decimalDigits: '2,3'}, false],
  ['1.0', {decimalDigits: '2,3'}, false],
  ['-.2564', {decimalDigits: '2,3'}, false],
  ['0.0', {decimalDigits: '2,3'}, false],
  ['٫1', {decimalDigits: '2,3'}, false],
  ['1٫0', {decimalDigits: '2,3'}, false],
  ['-٫25', {decimalDigits: '2,3'}, false],
  ['0٫0000000000001', {decimalDigits: '2,3'}, false],
  ['....', {decimalDigits: '2,3'}, false],
  [' ', {decimalDigits: '2,3'}, false],
  ['', {decimalDigits: '2,3'}, false],
  ['-', {decimalDigits: '2,3'}, false],
  ['+', {decimalDigits: '2,3'}, false],
  ['.', {decimalDigits: '2,3'}, false],
  ['0.1a', {decimalDigits: '2,3'}, false],
  ['a', {decimalDigits: '2,3'}, false],
  ['\n', {decimalDigits: '2,3'}, false],
])('validators.isDecimal("%s", "%s") should return %s', (received, options, expected) => {
  expect(validators.isDecimal(received, options)).toBe(expected);
});