import validator from 'validator';

/**
 * Check if it is an after date.
 */
export default (value: string, comparisonDate?: string): boolean => {
  //If the date to be compared is empty, the current date is set.
  if (!comparisonDate)
    comparisonDate = Date().toString();

  // Returns validation results.
  return validator.isAfter(value, comparisonDate);
}