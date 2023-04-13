/**
 * Returns a random number
 * @param multiplier - An int used to multiply the Math.random by. Defaults to 1e8.
 */
export const randomNumber = (multiplier = 1e8): number => Math.round(Math.random() * multiplier);
