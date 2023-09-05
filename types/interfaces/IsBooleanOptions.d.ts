/**
 * Boolean validate option.
 */
export default interface IsBooleanOptions {
    /**
      * If false, the validator will strictly match ['true', 'false', '0', '1'].
      * If true, the validator will also match 'yes', 'no', and will match a valid boolean string of any case. (e.g.: ['true', 'True', 'TRUE']).
      * Default is false.
      */
    loose?: boolean;
}
