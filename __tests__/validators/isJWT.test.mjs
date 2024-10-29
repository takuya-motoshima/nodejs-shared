import {validators} from '../../dist/build.mjs';

test.each([
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI', true],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb3JlbSI6Imlwc3VtIn0.ymiJSsMJXR6tMSr8G9usjQ15_8hKPDv_CArLhxw28MI', true],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2xvciI6InNpdCIsImFtZXQiOlsibG9yZW0iLCJpcHN1bSJdfQ.rRpe04zbWbbJjwM43VnHzAboDzszJtGrNsUxaqQ-GQ8', true],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqb2huIjp7ImFnZSI6MjUsImhlaWdodCI6MTg1fSwiamFrZSI6eyJhZ2UiOjMwLCJoZWlnaHQiOjI3MH19.YRLPARDmhGMC3BBk_OhtwwK21PIkVCqQe8ncIRPKo-E', true],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', false],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0', false],
  ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTYxNjY1Mzg3Mn0.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwiaWF0IjoxNjE2NjUzODcyLCJleHAiOjE2MTY2NTM4ODJ9.a1jLRQkO5TV5y5ERcaPAiM9Xm2gBdRjKrrCpHkGr_8M', false],
  ['$Zs.ewu.su84', false],
  ['ks64$S/9.dy$§kz.3sd73b', false],
])('validators.isJWT("%s") should return %s', (received, expected) => {
  expect(validators.isJWT(received)).toBe(expected);
});