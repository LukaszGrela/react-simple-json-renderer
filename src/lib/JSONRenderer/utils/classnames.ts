export type TClassNamesArg = string | undefined | boolean;
export const classnames = (...classNames: TClassNamesArg[]) =>
  classNames.filter((name) => !!name).join(' ');
