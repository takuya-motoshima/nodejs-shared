const {File} = require('../dist/build.common');

test('Without the `TMPDIR` environment variable, the tmp path should start with `/tmp/`', () => {
  delete process.env.TMPDIR;
  expect(File.getTmpPath().startsWith('/tmp/')).toBe(true);
});

test('If the environment variable `TMPDIR` is “/var/tmp”, the tmp path should start with `/var/tmp/`', () => {
  process.env.TMPDIR = '/var/tmp';
  expect(File.getTmpPath().startsWith('/var/tmp/')).toBe(true);
});