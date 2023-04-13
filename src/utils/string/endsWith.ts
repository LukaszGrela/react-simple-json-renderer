/**
 * Helper, safely checks if given string ends with required token.
 * @param {string} test string to test, MUST be not empty
 * @param {string} end token to search for, MUST be not empty
 * @returns {boolean} True when `end` token is found at the end of `test` string.
 */
export const endsWith = (test: string, end: string): boolean =>
  !!test &&
  !!end &&
  test.length >= end.length &&
  test.lastIndexOf(end) === test.length - end.length;
