import { buildTree, JSONRendererProvider } from './context';
import { IProps } from './types';
import { Editor } from './Editor';
import { Viewer } from './Viewer';

import '../styles.scss';

function JSONRenderer<T = any>({ children, data, collapsible }: IProps<T>) {
  console.log('JSONRenderer');
  // build initial data tree
  const treeData = buildTree(data);

  return (
    <JSONRendererProvider treeData={treeData} collapsible={collapsible}>
      <div className='JSONRenderer'>{children}</div>
    </JSONRendererProvider>
  );
}

JSONRenderer.Editor = Editor;
JSONRenderer.Viewer = Viewer;

export default JSONRenderer;
