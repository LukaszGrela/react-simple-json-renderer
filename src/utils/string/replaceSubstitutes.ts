import { IDictionary } from '../../shared/types';

/**
 * Matches the {digits} e.g. {0} or {12}
 * or
 * alphanumeric substitute names
 */
const PATTERN = /\{((\d+)|_([a-zA-Z][a-zA-Z0-9]*)_)\}/gm;

/**
 * Allows to replace the patterns with given arguments. Just pass matching number of substitutions.
 *
 * ## Examples
 *
  ```javascript
  const equation = replaceSubstitutes('Equation: {0} + {1} = {2}', '1','2',3);
  console.log(equation);// Equation: 1 + 2 = 3

  const pagination = replaceSubstitutes('Page {0} of {1}', 2, 10);
  console.log(pagination);// Page 2 of 10
  ```
 * @param input Strign with the placeholders
 * @param substitutes rest param with the substitutes to be used to replace placeholders, if the substitute is an object it must properly implement `toString` method, or provide string only.
 * @returns
 */
export const replaceSubstitutes = (input: string, ...substitutes: unknown[]): string => {
  const subs: IDictionary<unknown> = Array.from(substitutes).reduce(
    (acc: IDictionary<unknown>, curr, index): IDictionary<unknown> => ({
      ...acc,
      [index]: curr,
    }),
    {},
  );
  return replaceSubstitutesMap(input, subs);
};

/**
 * Allows to replace the patterns with given arguments.
 * Just pass dictionary object with keys matching placeholders.
 *
 * The key could be a number e.g. `{12}` or a label (alpha numeric only), in that case prepend and append an underscore e.g. `{_label123_}. Only label123 is used in the substitues object.
 * ## Examples
 *
  ```javascript
  const equation = replaceSubstitutesMap(
    "Equation: {_arg1_} + {_arg2_} = {_sum_}",
    {
      arg1: "1",
      arg2: "2",
      sum: 3,
    }
  );
  console.log(equation); // Equation: 1 + 2 = 3

  const pagination = replaceSubstitutesMap(
    'Page {0} of {1}',
    {
      0: 1,
      1: 12
    }
  );
  console.log(pagination); // Page 1 of 12
  ```
 * @param input String with the placeholders
 * @param substitutes dictionary with the substitutes used to replace placeholders.
 * @returns
 */
export const replaceSubstitutesMap = (input: string, substitutes: IDictionary<unknown>): string => {
  return input.replace(PATTERN, (...args) => {
    const match = args[0];
    const $group = `${args[2] || args[3]}`.replace('_', '');
    if (substitutes && substitutes[$group] !== undefined) {
      return `${substitutes[$group]}`;
    }
    return match;
  });
};
