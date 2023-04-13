import { randomNumber } from '../number/randomNumber';

/**
 * Returns a random string at given length
 */
export const randomString = () => randomNumber().toString(36);
