export const classnames = (...classNames: (string | undefined | boolean)[]) =>
  classNames.filter((name) => !!name).join(' ');
