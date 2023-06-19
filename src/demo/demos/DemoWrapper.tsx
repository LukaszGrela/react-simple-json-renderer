import { FC, ReactNode, useState } from 'react';
import { defaultConfig } from '~/lib/JSONRenderer';
import { SVGIcon } from '~/lib/JSONRenderer/components/SVGIcon';
import { IJSONRendererContextConfig } from '~/lib/JSONRenderer/context';

type TParams = {
  useEditor: boolean;
  useViewer: boolean;
} & IJSONRendererContextConfig;

export const DemoWrapper: FC<{
  children: (params: TParams) => ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<TParams>({
    useEditor: true,
    useViewer: true,
    ...defaultConfig,
  });
  const handleClick = (id: keyof TParams) => () => {
    setState((s) => {
      return { ...s, [id]: !s[id] };
    });
  };
  return (
    <div className='card'>
      <div
        className='card'
        style={{
          paddingTop: 0,
        }}
      >
        <div
          style={{
            fontSize: 12,
          }}
        >
          <SVGIcon icon='add' emBased />
          <SVGIcon icon='ban' emBased />
          <SVGIcon icon='close' emBased />
          <SVGIcon icon='collapse' emBased />
          <SVGIcon icon='confirm' emBased />
          <SVGIcon icon='copy' emBased />
          <SVGIcon icon='edit' emBased />
          <SVGIcon icon='expand' emBased />
          <SVGIcon icon='remove' emBased />
          <SVGIcon icon='success' emBased />
          <SVGIcon icon='failure' emBased />
        </div>
      </div>
      <div className='demo-wrapper-toolbox'>
        <button
          className={state.useEditor ? 'selected' : undefined}
          type='button'
          onClick={handleClick('useEditor')}
          title={`${!state.useEditor ? 'Use' : 'Remove'} Editor`}
        >
          Editor
        </button>{' '}
        <button
          className={state.useViewer ? 'selected' : undefined}
          type='button'
          onClick={handleClick('useViewer')}
          title={`${!state.useViewer ? 'Use' : 'Remove'} Viewer`}
        >
          Viewer
        </button>{' '}
        <button
          className={state.collapsible ? 'selected' : undefined}
          type='button'
          onClick={handleClick('collapsible')}
          title={`${!state.collapsible ? 'Make' : 'Turn off'} Collapsible`}
        >
          Collapsible
        </button>{' '}
        <button
          className={state.viewerUseQuotes ? 'selected' : undefined}
          type='button'
          onClick={handleClick('viewerUseQuotes')}
          title={`${!state.viewerUseQuotes ? 'Use' : "Don't use"} quotes`}
        >
          Use quotes
        </button>{' '}
        <button
          className={state.hideRootName ? 'selected' : undefined}
          type='button'
          onClick={handleClick('hideRootName')}
          title={`${!state.hideRootName ? 'Hide' : 'Show'} root name`}
        >
          Hide root name
        </button>
      </div>
      {children(state)}
    </div>
  );
};
