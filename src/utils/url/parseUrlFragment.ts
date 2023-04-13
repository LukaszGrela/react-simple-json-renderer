/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
type StringDictionary = { [key: string]: string };
/**
 * Takes the `hash` part of the url and gets the parameters stored in it.
 * ```JavaScript
 * const hash = location.hash;//#access_token=eyJh...MK0dA&token_type=Bearer&expires_in=7200&scope=SCP_BackOffice&state=eyJpZCI6IjAxMmUxOTRlNzU4NjQ2YTNiM2Q3MmVjMzlmNzk3NGQxIiwiZGF0YSI6eyJ1cmkiOiIvaG9tZSJ9fQ%3D%3D
 * const params = parseUrlFragment(hash);
 * console.log(params);// {"id":"abc","data":{"uri":"/home"},"response":{"access_token":"eyJh...MK0dA","token_type":"Bearer","expires_in":"7200","scope":"SCP_BackOffice"}}
 * ```
 * **Note:** There is a limit of `50` parameters that it will parse.
 * @param {string} url url containing fragment or `hash` property of the `location` object.
 * @param {string?} delimiter default `#`, fragment delimiter
 */
export const parseUrlFragment = (url: string, delimiter = '#'): StringDictionary => {
  let fragment = url;
  const idx = fragment.lastIndexOf(delimiter);
  if (idx >= 0) {
    fragment = fragment.substr(idx + 1);
  }

  const params: StringDictionary = {};
  const regex = /([^&=]+)=([^&]*)/g;
  let m;

  let counter = 0;
  // eslint-disable-next-line no-cond-assign
  while ((m = regex.exec(fragment))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    counter += 1;
    if (counter > 50) {
      console.error('parseUrlFragment: response exceeded expected number of parameters', fragment);
      return {
        error: 'Response exceeded expected number of parameters',
      };
    }
  }

  // checks if params contains any data
  for (const _ in params) {
    return params;
  }

  // otherwise return empty
  return {};
};
