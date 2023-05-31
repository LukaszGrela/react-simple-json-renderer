import { buildTree, JSONRendererConfigProvider, JSONRendererProvider } from './context';
import { IProps } from './types';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { SizeContainer } from './components/SizeContainer';

function JSONRenderer<T = any>({
  children,
  data,
  onChange,
  collapsible = true,
  viewerUseQuotes = false,
  hideRootName = false,
}: IProps<T>) {
  // build initial data tree
  const treeData = buildTree(data);
  console.log(treeData);
  return (
    <JSONRendererConfigProvider
      collapsible={collapsible}
      viewerUseQuotes={viewerUseQuotes}
      hideRootName={hideRootName}
    >
      <JSONRendererProvider treeData={treeData} onChange={onChange}>
        <SizeContainer className='JSONRenderer'>{children}</SizeContainer>
      </JSONRendererProvider>
    </JSONRendererConfigProvider>
  );
}

JSONRenderer.Editor = Editor;
JSONRenderer.Viewer = Viewer;

export default JSONRenderer;
