export interface IProps {
  collapsible: boolean;
  toggleNodeCollapsed: () => void;
  isNodeCollapsed: () => boolean;
  styles?: {
    collapseIcon: {
      cursor: string;
    };
  };
}
