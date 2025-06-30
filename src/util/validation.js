/**
 * validation.js
 *
 * This utility file contains common validation helper functions
 * used to check user input in forms.
 * Each function returns a boolean indicating whether the input is valid.
 */

/**
 * Checks if the given value is not empty (after trimming).
 *
 * @param {string} value - The input value to validate.
 * @returns {boolean} True if the value is not empty, false otherwise.
 */
export function isNotEmpty(value) {
  return value.trim() !== '';
}

/**
 * Checks if the given value has at least the specified minimum length.
 *
 * @param {string} value - The input value to validate.
 * @param {number} minLength - The required minimum length.
 * @returns {boolean} True if the value meets or exceeds the minimum length, false otherwise.
 */
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

/**
 * Checks if the given value is equal to another value.
 * Useful for comparing inputs like passwords or confirmation fields.
 *
 * @param {string} value - The value to compare.
 * @param {string} otherValue - The value to compare against.
 * @returns {boolean} True if both values are equal, false otherwise.
 */
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
