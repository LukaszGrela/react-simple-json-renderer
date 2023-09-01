import { IJSONRendererContextConfig } from '~/lib/JSONRenderer/context';

export type TParams = {
  useEditor: boolean;
  useViewer: boolean;
} & IJSONRendererContextConfig;
