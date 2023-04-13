export interface IProps {
  saveElement: (dataElement: any, key: string) => void;
  saveIn: any;
  saveKey: string;
  styles?: {
    saveButton?: any;
  };
}
