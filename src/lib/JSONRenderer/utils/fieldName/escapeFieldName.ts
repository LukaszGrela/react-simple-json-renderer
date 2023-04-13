export const escapeFieldName = (name: string): string => {
  return name.replace(/\./gm, 'U+002E');
};
