import validator from 'validator';

/**
 * Check if it is a hash of the specified algorithm.
 */
export default (value: string, algorithm: 'md4'|'md5'|'sha1'|'sha256'|'sha384'|'sha512'|'ripemd128'|'ripemd160'|'tiger128'|'tiger160'|'tiger192'|'crc32'|'crc32b'): boolean => {
  // Returns validation results.
  return validator.isHash(value, algorithm);
}