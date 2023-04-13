import { TTreeDescription } from '~/lib/JSONRenderer/context';
import { TDataType } from '~/lib/types';

export interface IProps {
  /**
   * Container node details
   */
  treeDescriptor: TTreeDescription;

  /**
   * Selected data type to add new field
   */
  newType: TDataType;

  /**
   * Cancel adding new field
   */
  cancel: () => void;

  /**
   * Populate with predefined field name
   */
  initialFieldName?: string;
  /**
   * If the field name can be edited. Default true.
   * To be used with `initialFieldName`.
   */
  fieldNameEditable?: boolean;
}
