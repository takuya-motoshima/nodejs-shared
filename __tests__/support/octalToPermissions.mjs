/**
 * Converts a file mode (represented as a number) to an octal permission string (e.g., "755").
 * Handles both numeric and string representations of the octal mode.  Provides error handling for invalid input.
 * @param {number|string} mode The file mode as a number or an octal string.
 * @return {string} The octal permission string (e.g., "755", "644") or an error message if the input is invalid.
 */
export default mode => {
  let modeNum;
  if (typeof mode === 'number') {
    modeNum = mode;
  } else if (typeof mode === 'string') {
    modeNum = parseInt(mode, 8);
    if (isNaN(modeNum))
      return "Invalid input: Not a valid octal string.";
  } else
    return "Invalid input: Mode must be a number or an octal string.";
  const octalString = modeNum.toString(8);
  return octalString.padStart(3, '0').slice(-3); // Ensure 3 digits (e.g., "077" instead of "77")
}