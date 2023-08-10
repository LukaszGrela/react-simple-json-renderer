import { ReactNode } from 'react';

export interface IProps {
  initialCollapsed?: boolean;
  className?: string;
  children?: TFunctionChildren | ReactNode | undefined;
}
export type TFunctionProps = {
  isCollapsed: boolean;
  collapsible: boolean;
  toggleCollapse: () => void;
  setCollapsed: (state: boolean) => void;
};
export type TFunctionChildren = (props: TFunctionProps) => ReactNode | undefined;
export const guardFunctionChildren = (test: unknown): test is TFunctionChildren => {
  return !!test && typeof test === 'function';
};
