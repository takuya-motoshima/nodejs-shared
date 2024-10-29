import validator from 'validator';

/**
 * Options for email validation.
 * @interface
 */
export interface IsEmailOptions {
  /**
   * Allows "Display Name <email-address>" format if `true`. Defaults to `false`.
   */
  allowDisplayName?: boolean;
  /**
   * Requires "Display Name <email-address>" format if `true`. Defaults to `false`.
   */
  requireDisplayName?: boolean;
  /**
   * Allows non-English UTF8 characters in the local part of the email address if `true`. Defaults to `true`.
   */
  allowUtf8LocalPart?: boolean;
  /**
   * Requires a TLD in the domain if `true`. Defaults to `true`.
   */
  requireTld?: boolean;
  /**
   * Rejects emails with domains in this blacklist. Defaults to an empty array.
   */
  hostBlacklist?: string[];
  /**
   * Rejects emails with domains not in this whitelist. Defaults to an empty array.
   */
  hostWhitelist?: string[];  // validator.js's type definitions are missing this, hence the ts-ignore below.
}

/**
 * Checks if a string is a valid email address.
 * @param {string} value The string to validate.
 * @param {IsEmailOptions} options Options for email validation.
 * @return {boolean} `true` if the string is a valid email, `false` otherwise.
 */
export default (value: string, options: IsEmailOptions = {}): boolean => {
  const mergedOptions = {
    allowDisplayName: false,
    requireDisplayName: false,
    allowUtf8LocalPart: true,
    requireTld: true,
    hostBlacklist: [],
    hostWhitelist: [],
    ...options
  };

  const validatorOptions: validator.IsEmailOptions = { // Explicitly typing the options for validator.isEmail
    allow_display_name: mergedOptions.allowDisplayName,
    require_display_name: mergedOptions.requireDisplayName,
    allow_utf8_local_part: mergedOptions.allowUtf8LocalPart,
    require_tld: mergedOptions.requireTld,
    host_blacklist: mergedOptions.hostBlacklist,

    // Workaround for missing type definition in validator.js
    host_whitelist: mergedOptions.hostWhitelist as unknown as string[], // Temporary workaround, 

    // Additional options with default values
    blacklisted_chars: '',
    // allow_underscores: false,// allow_underscores seems to be missing from the type definition in node_modules/@types/validator/lib/isEmail.d.ts.
    allow_ip_domain: false,
    ignore_max_length: true,
    domain_specific_validation: false,
  };
  return validator.isEmail(value, validatorOptions);
}