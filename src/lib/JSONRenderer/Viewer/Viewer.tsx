import React from 'react';
import { observer } from '@legendapp/state/react';
import { TViewer } from './types';
import { useJSONRendererContext } from '../context';
import { Element } from './components';

// const buildComponents = (tree: Observable<TJSONValue>): ReactNode => {
//   const peeked = tree.peek();

//   if (guardIsPrimitiveValue(peeked)) {
//     return <Leaf id={EBuiltInKeys.ROOT} value={peeked} />;
//   } else {
//     return <Container viewer item={tree} id={EBuiltInKeys.ROOT} />
//   }

//   // function traverse(tree?: TTree) {
//   //   if (!tree) return null;
//   //   return keys(tree).map((key) => {
//   //     const data = tree[key];

//   //     switch (data.type) {
//   //       case 'boolean':
//   //       case 'number':
//   //       case 'string':
//   //       case 'null':
//   //         return <Leaf key={data.uniqueId} treeDescriptor={data} value={get(source, data.path)} />;
//   //       case 'array':
//   //       case 'object':
//   //         return (
//   //           <ViewerContainer
//   //             className={!data.children ? 'empty' : undefined}
//   //             type={data.type}
//   //             key={data.uniqueId}
//   //             treeDescriptor={data}
//   //           >
//   //             {data.children && traverse(data.children)}
//   //             {!data.children && <></>}
//   //           </ViewerContainer>
//   //         );

//   //       default:
//   //         break;
//   //     }
//   //   });
//   // }

//   // return traverse(tree);

//   return '@TODO: Implement me';
// };

const Viewer: TViewer = observer((): JSX.Element => {
  const context = useJSONRendererContext();

  return (
    <div className='Viewer'>
      <div className='Viewer_treeBuilder'>{<Element item={context} className='viewer root' />}</div>
    </div>
  );
});

export default React.memo(Viewer);
