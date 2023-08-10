import React, { ReactNode } from 'react';
import keys from 'lodash/keys';
import { TEditor } from './types';
import { useJSONRendererContext, TTree, JSONRendererActionsProvider } from '../context';
import { Container, Input, NullElement } from '../components';
import { Element } from './components';
import { observer } from '@legendapp/state/react';

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
            </Container>
          );

        default:
          break;
      }
    });
  }

  return traverse(tree);
};

const Editor: TEditor = observer((): JSX.Element => {
  const context = useJSONRendererContext();

  return (
    <JSONRendererActionsProvider>
      <div className='Editor'>
        <div className='Editor_treeBuilder'>
          {<Element item={context} className='editor root' />}
        </div>
      </div>
    </JSONRendererActionsProvider>
  );
});

export default React.memo(Editor);
