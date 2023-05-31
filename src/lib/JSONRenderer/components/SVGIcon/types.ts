export type TIconType =
  | 'add'
  | 'ban'
  | 'confirm'
  | 'remove'
  | 'edit'
  | 'collapse'
  | 'expand'
  | 'close';
export interface IProps {
  /**
   * The `IconTypesEnum` string
   */
  icon: TIconType;

  title?: string;
  className?: string;

  viewBox?: string;
  id?: string;

  /**
   * When true the size is in form of 1em and fontSize is used
   */
  emBased?: boolean;
}
