import { randomString } from './randomString';

/**
 * Returns unique ID made up from timestamp and 2 `randomString` calls.
 */
export const uniqueId = () =>
  `${new Date().getTime().toString(36)}-${randomString()}-${randomString()}`.toUpperCase();
