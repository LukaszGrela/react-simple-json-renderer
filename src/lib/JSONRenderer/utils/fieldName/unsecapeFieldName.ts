export const unescapeFieldName = (name: string): string => {
  return name?.replace(/U\+002E/gm, '.') || '';
};
