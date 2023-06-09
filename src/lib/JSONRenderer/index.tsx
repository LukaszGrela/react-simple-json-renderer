import {
  buildTree,
  IJSONRendererContextConfig,
  JSONRendererConfigProvider,
  JSONRendererProvider,
} from './context';
import { IProps } from './types';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { SizeContainer } from './components/SizeContainer';

export const defaultConfig: IJSONRendererContextConfig = {
  collapsible: true,
  viewerUseQuotes: false,
  hideRootName: true,
};
function JSONRenderer<T = any>({ children, data, onChange, config }: IProps<T>) {
  // build initial data tree
  const treeData = buildTree(data);
  const configuration = {
    ...defaultConfig,
    ...config,
  };
  return (
    <JSONRendererConfigProvider {...configuration}>
      <JSONRendererProvider treeData={treeData} onChange={onChange}>
        <SizeContainer className='JSONRenderer'>{children}</SizeContainer>
      </JSONRendererProvider>
    </JSONRendererConfigProvider>
  );
}

JSONRenderer.Editor = Editor;
JSONRenderer.Viewer = Viewer;

export default JSONRenderer;
