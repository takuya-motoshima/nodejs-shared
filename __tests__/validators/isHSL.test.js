const {validators: {isHSL}} = require('../../dist/build.common');

describe('Valid HSL color should be true', () => {
  test.each([
    ['hsl(360,0000000000100%,000000100%)', true],
    ['hsl(000010, 00000000001%, 00000040%)', true],
    ['HSL(00000,0000000000100%,000000100%)', true],
    ['hsL(0, 0%, 0%)', true],
    ['hSl(  360  , 100%  , 100%   )', true],
    ['Hsl(  00150  , 000099%  , 01%   )', true],
    ['hsl(01080, 03%, 4%)', true],
    ['hsl(-540, 03%, 4%)', true],
    ['hsla(+540, 03%, 4%)', true],
    ['hsla(+540, 03%, 4%, 500)', true],
    ['hsl(+540deg, 03%, 4%, 500)', true],
    ['hsl(+540gRaD, 03%, 4%, 500)', true],
    ['hsl(+540.01e-98rad, 03%, 4%, 500)', true],
    ['hsl(-540.5turn, 03%, 4%, 500)', true],
    ['hsl(+540, 03%, 4%, 500e-01)', true],
    ['hsl(+540, 03%, 4%, 500e+80)', true],
    ['hsl(4.71239rad, 60%, 70%)', true],
    ['hsl(270deg, 60%, 70%)', true],
    ['hsl(200, +.1%, 62%, 1)', true],
    ['hsl(270 60% 70%)', true],
    ['hsl(200, +.1e-9%, 62e10%, 1)', true],
    ['hsl(.75turn, 60%, 70%)', true],
    // ['hsl(200grad+.1%62%/1)', true],// It should pass, but the delimiter must be handled.
    ['hsl(200grad +.1% 62% / 1)', true],
    ['hsl(270, 60%, 50%, .15)', true],
    ['hsl(270, 60%, 50%, 15%)', true],
    ['hsl(270 60% 50% / .15)', true],
    ['hsl(270 60% 50% / 15%)', true],
  ])('isHSL("%s") = %s', (a, expected) => {
    expect(isHSL(a)).toBe(expected);
  });
});

describe('Invalid hex color should be false', () => {
  test.each([
    ['hsl (360,0000000000100%,000000100%)', false],
    ['hsl(0260, 100 %, 100%)', false],
    ['hsl(0160, 100%, 100%, 100 %)', false],
    ['hsl(-0160, 100%, 100a)', false],
    ['hsl(-0160, 100%, 100)', false],
    ['hsl(-0160 100%, 100%, )', false],
    ['hsl(270 deg, 60%, 70%)', false],
    ['hsl( deg, 60%, 70%)', false],
    ['hsl(, 60%, 70%)', false],
    ['hsl(3000deg, 70%)', false],
  ])('isHSL("%s") = %s', (a, expected) => {
    expect(isHSL(a)).toBe(expected);
  });
});