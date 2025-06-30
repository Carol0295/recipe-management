/**
 * Checks if the given value is a valid text string within the specified length range.
 * @param {string} value - The text input to validate.
 * @param {number} [minLength=1] - Minimum allowed length.
 * @param {number} [maxLength=100] - Maximum allowed length.
 * @returns {boolean} True if valid, false otherwise.
 */
export function isValidText(value, minLength = 1, maxLength = 100) {
  return (
    typeof value === 'string' &&
    value.trim().length >= minLength &&
    value.trim().length <= maxLength
  );
}

/**
 * Checks if the given value is a valid number greater than or equal to the minimum.
 * @param {number|string} value - The value to validate.
 * @param {number} [min=1] - Minimum acceptable value.
 * @returns {boolean} True if it's a valid number and >= min, false otherwise.
 */
export function isValidNumber(value, min = 1) {
  const number = +value;
  return !isNaN(number) && number >= min;
}

/**
 * Checks if the given value is a non-empty array.
 * @param {*} value - The value to check.
 * @returns {boolean} True if it's a non-empty array, false otherwise.
 */
export function isNonEmptyArray(value) {
  return isAnArray(value) && value.length > 0;
}

/**
 * Checks if the given value is an array (empty or not).
 * @param {*} value - The value to check.
 * @returns {boolean} True if it's an array, false otherwise.
 */
export function isAnArray(value) {
  return Array.isArray(value);
}
