import { ReactNode } from 'react';
import keys from 'lodash/keys';
import { TEditor } from './types';
import { useJSONRendererContext, TTree } from '../context';
import { AddNewItem, Container, Input, NullElement } from '../components';

const buildComponents = (tree: TTree, source: any): ReactNode => {
  function traverse(tree?: TTree) {
    if (!tree) return null;
    return keys(tree).map((key) => {
      const data = tree[key];

      switch (data.type) {
        case 'boolean':
        case 'number':
        case 'string':
          return <Input key={data.uniqueId} dataPathRef={source} treeDescriptor={data} />;
        case 'null':
          return <NullElement key={data.uniqueId} dataPathRef={source} treeDescriptor={data} />;
        case 'array':
        case 'object':
          return (
            <Container type={data.type} key={data.uniqueId} treeDescriptor={data}>
              {data.children && traverse(data.children)}
              {!data.children && <AddNewItem treeDescriptor={{ ...data, level: data.level + 1 }} />}
            </Container>
          );

        default:
          break;
      }
    });
  }

  return traverse(tree);
};

const Editor: TEditor = (): JSX.Element => {
  console.log('Editor');
  const {
    treeData: { wrapper, tree },
  } = useJSONRendererContext();
  console.log(wrapper, tree);

  const components = buildComponents(tree, wrapper);

  return (
    <div className='Editor'>
      <div className='Editor_treeBuilder'>{components}</div>
    </div>
  );
};

export default Editor;
