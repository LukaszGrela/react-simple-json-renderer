import { ReactNode } from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import { TViewer } from './types';
import { TTree, useJSONRendererContext } from '../context';
import { ContainerWrapper, Leaf } from '../components';

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
            <ContainerWrapper
              className={!data.children ? 'empty' : undefined}
              type={data.type}
              key={data.uniqueId}
              treeDescriptor={data}
            >
              {data.children && traverse(data.children)}
              {!data.children && <></>}
            </ContainerWrapper>
          );

        default:
          break;
      }
    });
  }

  return traverse(tree);
};

const Editor: TViewer = (): JSX.Element => {
  console.log('Viewer');
  const {
    treeData: { wrapper, tree },
  } = useJSONRendererContext();

  const components = buildComponents(tree, wrapper);

  return (
    <div className='Viewer'>
      <div className='Viewer_treeBuilder'>{components}</div>
    </div>
  );
};

export default Editor;
