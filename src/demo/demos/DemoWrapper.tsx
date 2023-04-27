import { FC, ReactNode, useState } from 'react';

type TParams = {
  useEditor: boolean;
  useViewer: boolean;
  viewerUseQuotes?: boolean;
  collapsible?: boolean;
};

export const DemoWrapper: FC<{
  children: (params: TParams) => ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<TParams>({
    useEditor: true,
    useViewer: true,
    collapsible: false,
    viewerUseQuotes: false,
  });
  const handleClick = (id: keyof TParams) => () => {
    setState((s) => {
      return { ...s, [id]: !s[id] };
    });
  };
  return (
    <div className='card'>
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
        </button>
      </div>
      {children(state)}
    </div>
  );
};
