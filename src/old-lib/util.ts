import type { TDataType } from './types';

export const EDIT_KEY = '__editable_json_editor__' as const;

export const getKey = (
  prefix: string,
  currentKey: string,
  parentKeyPath: string,
  marginLeft: string,
) => {
  return `${prefix}_${parentKeyPath}_${currentKey}_${marginLeft}`;
};

export const jsonEditorDefaultStyles = {
  dualView: {
    display: 'flex',
  },
  jsonViewer: {
    borderLeft: '1px solid lightgrey',
    width: '50%',
    margin: 10,
  },
  jsonEditor: {
    width: '50%',
    fontSize: 14,
    fontFamily: 'monospace',
    margin: 10,
  },
  label: {
    color: '#c00',
    marginTop: 4,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: 'flex',
    alignItems: 'baseline',
  },
  root: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  withChildrenLabel: {
    color: '#a52a2a',
  },
  select: {
    borderRadius: 3,
    borderColor: '#d3d3d3',
  },
  typeSelect: {
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  input: {
    borderRadius: 3,
    border: '1px solid #d3d3d3',
    padding: 3,
  },
  addButton: {
    cursor: 'pointer',
    color: 'black',
    marginLeft: 15,
    fontSize: 14,
  },
  removeButton: {
    cursor: 'pointer',
    color: 'red',
    marginLeft: 15,
    fontSize: 14,
  },
  saveButton: {
    cursor: 'pointer',
    color: 'green',
    marginLeft: 15,
    fontSize: 14,
  },
  builtin: {
    color: '#00f',
  },
  text: {
    color: '#077',
  },
  number: {
    color: '#a0a',
  },
  property: {
    color: '#c00',
  },
  collapseIcon: {
    cursor: 'pointer',
  },
};

export const jsonViewerDefaultStyles = {
  root: {
    margin: 5,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  builtin: {
    color: '#00f',
  },
  text: {
    color: '#077',
  },
  number: {
    color: '#a0a',
  },
  property: {
    color: '#c00',
  },
  collapseIcon: {
    cursor: 'pointer',
  },
};

type TDataTypeMap = {
  undefined: string;
  text: string;
  object: object;
  array: any[];
  boolean: boolean;
  number: number;
  null: null;
};

export const defaultValueByType = <T extends TDataType>(type: T): TDataTypeMap[typeof type] => {
  switch (type) {
    case 'object':
      return {} as TDataTypeMap[T];
    case 'array':
      return [] as TDataTypeMap[T];
    case 'boolean':
      return false as TDataTypeMap[T];
    case 'number':
      return 0 as TDataTypeMap[T];
    case 'null':
      return null as TDataTypeMap[T];
    case 'text': // fall-through
    default:
      return '' as TDataTypeMap[T];
  }
};
