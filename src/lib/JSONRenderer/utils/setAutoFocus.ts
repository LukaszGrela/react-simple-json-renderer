export const setAutoFocus = (element: HTMLElement | null): void => {
  element?.focus();
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });
};
