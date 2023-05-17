import { buildTree, JSONRendererConfigProvider, JSONRendererProvider } from './context';
import { IProps } from './types';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { SizeContainer } from './components/SizeContainer';

function JSONRenderer<T = any>({
  children,
  data,
  collapsible = true,
  viewerUseQuotes = false,
}: IProps<T>) {
  // build initial data tree
  const treeData = buildTree(data);

  return (
    <JSONRendererConfigProvider collapsible={collapsible} viewerUseQuotes={viewerUseQuotes}>
      <JSONRendererProvider treeData={treeData}>
        <SizeContainer className='JSONRenderer'>{children}</SizeContainer>
      </JSONRendererProvider>
    </JSONRendererConfigProvider>
  );
}

JSONRenderer.Editor = Editor;
JSONRenderer.Viewer = Viewer;

export default JSONRenderer;
