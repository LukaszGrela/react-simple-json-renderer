/**
 * Returns `true` if the given url contains the query `?` character.
 * @param url url string to test
 */
export const hasQuery = (url: string) => url.indexOf('?') !== -1;
