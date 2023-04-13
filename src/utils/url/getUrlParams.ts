/**
 * Returns an object with found URL parameters.
 * @param search `Location` search string (or url with a query)
 * @param autoDecode when `true` it will call decodeURIComponent on each value and key to make it counter part of `toUrlParams`
 */
export const getUrlParameters = (
  search?: string,
  autoDecode?: boolean,
): { [key: string]: string } => {
  const urlParamRegEx = /([^?&=]+)=([^&=]*)/gi;
  const parameters: { [key: string]: string } = {};
  // When running app in POS web browser
  // use search part to narrow the string
  if (search === undefined) {
    search = window.location.search;
  }
  search.replace(urlParamRegEx, (_, key: string, value: string): string => {
    if (autoDecode) {
      parameters[decodeURIComponent(key)] = decodeURIComponent(value);
    } else {
      parameters[key] = value;
    }

    return _;
  });

  return parameters;
};
