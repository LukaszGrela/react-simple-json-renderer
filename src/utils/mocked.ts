import { getUrlParameters } from './url';

export const development = (): boolean => process.env.NODE_ENV !== 'production';

const ns = 'platform-portal-local-storage';
const key = `${ns}:mocked`;
// read demo mode override from url param (?mocked=true)
const params = getUrlParameters();
if (params && (Object.hasOwn(params, 'mocked') || Object.hasOwn(params, 'demo'))) {
  localStorage.setItem(
    key,
    params.mocked === 'true' ||
      params.demo === 'true' ||
      params.mocked === '1' ||
      params.demo === '1'
      ? 'true'
      : 'false',
  );
} else {
  // no mocked param
  if (development() && localStorage.getItem(key) === null) {
    // if development and no mocked found, set it so by default it uses `_LOCAL` env variables
    localStorage.setItem(key, 'true');
  }
}

export const mocked = (): boolean => localStorage.getItem(key) === 'true';
