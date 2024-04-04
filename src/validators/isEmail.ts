import validator from 'validator';
import {merge} from 'deep-fusion';
import IsEmailOptions from '~/interfaces/IsEmailOptions';

/**
 * Check if it is an email address.
 * @param {string} value Value to be validated.
 * @param {IsEmailOptions} options? Validation options.
 * @return {boolean} True for pass, false for fail.
 */
export default (value: string, options?: IsEmailOptions): boolean => {
  // Initialize options.
  options = merge({
    allowDisplayName: false,
    requireDisplayName: false,
    allowUtf8LocalPart: true,
    requireTld: true,
    hostBlacklist: [],
    hostWhitelist: [],
  }, options);

  // Returns validation results.
  return validator.isEmail(value, {
    allow_display_name: options?.allowDisplayName,
    require_display_name: options?.requireDisplayName,
    allow_utf8_local_part: options?.allowUtf8LocalPart,
    require_tld: options?.requireTld,
    host_blacklist: options?.hostBlacklist,

    // @ts-ignore
    host_whitelist: options?.hostWhitelist,
    blacklisted_chars: '',// If blacklisted_chars receives a string, then the validator will reject emails that include any of the characters in the string, in the name part.

    // @ts-ignore
    allow_underscores: false,// If true, allows the use of underscore characters in the domain. Default is false.
    allow_ip_domain: false,// If allow_ip_domain is set to true, the validator will allow IP addresses in the host part.
    ignore_max_length: true,// If ignore_max_length is set to true, the validator will not check for the standard max length of an email.
    domain_specific_validation: false,// If domain_specific_validation is true, some additional validation will be enabled, e.g. disallowing certain syntactically valid email addresses that are rejected by Gmail.
  });
}