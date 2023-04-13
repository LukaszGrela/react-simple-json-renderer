export interface IProps {
  removeElement: (dataElement: any, key: string) => void;
  removeFrom: any;
  removeKey: string;
  hidden?: boolean;
  styles?: {
    removeButton?: any;
  };
}
