import { FC, useState } from 'react';
import { WithEmptyObject } from './demos/WithEmptyObject';
import { WithEmptyArray } from './demos/WithEmptyArray';
import { WithBigJson } from './demos/WithBigJson';

import '~/lib/styles.scss';
import './App.css';

const App: FC = () => {
  const [demo, setDemo] = useState(0);
  const handleClick = (id: number) => () => {
    setDemo(id);
  };
  return (
    <div className='App'>
      <header>
        <h1>JSONRenderer Demo</h1>
      </header>
      <menu>
        <h2>Select demo</h2>
        <ul className='demo-menu'>
          <li>
            <button
              className={demo === 0 ? 'selected' : undefined}
              type='button'
              onClick={handleClick(0)}
            >
              With empty object
            </button>
          </li>
          <li>
            <button
              className={demo === 1 ? 'selected' : undefined}
              type='button'
              onClick={handleClick(1)}
            >
              With empty array
            </button>
          </li>
          <li>
            <button
              className={demo === 2 ? 'selected' : undefined}
              type='button'
              onClick={handleClick(2)}
            >
              With big JSON
            </button>
          </li>
        </ul>
      </menu>
      <main>
        {demo === 0 && <WithEmptyObject />}
        {demo === 1 && <WithEmptyArray />}
        {demo === 2 && <WithBigJson />}
      </main>
      <footer>
        <a href='https://greladesign.co/blog' target='_blank' rel='noreferrer'>
          GrelaDesign.co
        </a>
        {' - '}
        Made with{' '}
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          Vite
        </a>{' '}
        +{' '}
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          React
        </a>{' '}
        +{' '}
        <a href='https://www.typescriptlang.org/' target='_blank' rel='noreferrer'>
          TypeScript
        </a>
      </footer>
    </div>
  );
};

export default App;
