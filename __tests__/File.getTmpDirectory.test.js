const {File} = require('../dist/build.common');

test('Without the `TMPDIR` environment variable, the tmp directory should be `/tmp`', () => {
  delete process.env.TMPDIR;
  expect(File.getTmpDirectory()).toBe('/tmp');
});

test('If the environment variable `TMPDIR` is “/var/tmp”, the tmp directory should be `/var/tmp`', () => {
  process.env.TMPDIR = '/var/tmp';
  expect(File.getTmpDirectory()).toBe('/var/tmp');
});