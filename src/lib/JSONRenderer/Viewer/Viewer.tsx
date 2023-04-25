import { ReactNode, useMemo } from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import { TViewer } from './types';
import { TTree, useJSONRendererContext } from '../context';
import { ViewerContainer, Leaf } from '../components';
import React from 'react';

const buildComponents = (tree: TTree, source: any): ReactNode => {
  function traverse(tree?: TTree) {
    if (!tree) return null;
    return keys(tree).map((key) => {
      const data = tree[key];

      switch (data.type) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'null':
          return <Leaf key={data.uniqueId} treeDescriptor={data} value={get(source, data.path)} />;
        case 'array':
        case 'object':
          return (
            <ViewerContainer
              className={!data.children ? 'empty' : undefined}
              type={data.type}
              key={data.uniqueId}
              treeDescriptor={data}
            >
              {data.children && traverse(data.children)}
              {!data.children && <></>}
            </ViewerContainer>
          );

        default:
          break;
      }
    });
  }

  return traverse(tree);
};

const Viewer: TViewer = (): JSX.Element => {
  const { wrapper, tree } = useJSONRendererContext();

  const components = useMemo(() => buildComponents(tree, wrapper), [tree, wrapper]);

  return (
    <div className='Viewer'>
      <div className='Viewer_treeBuilder'>{components}</div>
    </div>
  );
};

export default React.memo(Viewer);
