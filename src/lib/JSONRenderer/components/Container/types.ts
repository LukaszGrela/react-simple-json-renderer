import React from 'react';
import { TTreeDescription } from '~/lib/JSONRenderer/context';

export interface IProps {
  type: 'array' | 'object';
  children: React.ReactNode;
  treeDescriptor: TTreeDescription;
}

export interface IWrapperProps extends IProps {
  className?: string | boolean;
  toolbox?: React.ReactNode;
  onCollapse?: (state: boolean) => void;

  viewer?: boolean;
  collapsible?: boolean;
  useQuotes?: boolean;
  hideRootName?: boolean;
}
