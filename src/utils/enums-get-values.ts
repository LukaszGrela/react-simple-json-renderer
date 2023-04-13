import { getEnumNames } from './enums-get-names';

type TEnum = { [key: string]: unknown; [index: number]: unknown };

/**
 * Returns a list of stringified enum values
 * @param e an Enum
 * @returns
 */
export const getEnumValues = <E extends TEnum>(e: E): string[] => {
  const s = getEnumNames<E>(e);
  const results: string[] = [];
  Array.from(s).forEach((v2) => results.push(`${v2.toString()}`));
  return results;
};

/**
 * Returns `Set` of typed values exactly as set in the provided enum
 * ```TypeScript
 * enum SomeEnum {
 *  EAT: 0,
 *  SLEEP: 1,
 *  WALK: 2,
 * }
 * const someRecord: Record<SomeEnum, string> = {
 *  [SomeEnum.EAT]:"Eating",
 *  [SomeEnum.SLEEP]:"Sleeping",
 *  [SomeEnum.WALK]:"Walking",
 * };
 * // this will make TS unhappy
 * Object.keys(someRecord).forEach(key => console.log(someRecord[key]))
 *
 * // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Record<SomeEnum, string>'.
 * // No index signature with a parameter of type 'string' was found on type 'Record<SomeEnum, string>'.ts(7053)
 *
 * // but with this helper it is happy
 * getEnumValuesTyped(SomeEnum).forEach((key) => {
 *  console.log(someRecord[key]);
 * });
 *
 * ```
 * @param e
 * @returns
 */
export const getEnumValuesTyped = <E extends TEnum>(e: E): Set<E[keyof E]> => {
  const s = getEnumNames<E>(e);
  const values = new Set<E[keyof E]>();

  s.forEach((_value, key) => {
    values.add(e[key]);
  });

  return values;
};
