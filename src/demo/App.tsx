import { FC, useState } from 'react';
import { JSONRenderer } from '~/lib';
import { WithEmptyObject } from './demos/WithEmptyObject';
import { WithEmptyArray } from './demos/WithEmptyArray';

import './App.css';
import { WithBigJson } from './demos/WithBigJson';

const source = {
  mobile: {
    possibleCountryCodes: ['KE', 'UG', 'TZ'],
    possibleLengths: {
      national: '5',
      sub_national: '7',
    },
    exampleNumber: 40123,
    nationalNumberPattern: '4\\d{4}',
  },
  id: 'AC',
  is_valid_number: true,
  generalDesc: {
    nationalNumberPattern: '[46]\\d{4}|[01589]\\d{5}',
  },
  countryCode: '247',
  uan: {
    possibleLengths: {
      national: '6',
    },
    exampleNumber: 542011,
    nationalNumberPattern: '[01589]\\d{5}',
  },
  references: {
    sourceUrl: 'http://www.itu.int/oth/T02020000AF/en',
  },
  internationalPrefix: '00',
  fixedLine: {
    possibleLengths: {
      national: '5',
    },
    exampleNumber: 62889,
    nationalNumberPattern: '6[2-467]\\d{3}',
  },
  func: () => console.log('42'),
  hugeOne: BigInt(9007199254740991),
  symbol: Symbol('test'),
  nullValue: null,
  undefinedValue: undefined,
  emptyObject: {},
  emptyArray: [],
};

const bigjson = {
  name: 'react-json-editor-viewer-ts',
  version: '2.0.0',
  lockfileVersion: 2,
  requires: true,
  packages: {
    '': {
      name: 'react-json-editor-viewer-ts',
      version: '2.0.0',
      license: 'MIT',
      dependencies: {
        immer: '^9.0.21',
        lodash: '^4.17.21',
        'use-immer': '^0.9.0',
      },
      devDependencies: {
        '@testing-library/jest-dom': '^5.16.5',
        '@testing-library/react': '^14.0.0',
        '@testing-library/user-event': '^14.4.3',
        '@types/lodash': '^4.14.192',
        '@types/node': '^18.15.11',
        '@types/react': '^18.0.28',
        '@types/react-dom': '^18.0.11',
        '@typescript-eslint/eslint-plugin': '^5.57.1',
        '@typescript-eslint/parser': '^5.57.1',
        '@vitejs/plugin-react-swc': '^3.0.0',
        eslint: '^8.37.0',
        'eslint-config-prettier': '^8.8.0',
        'eslint-plugin-import': '^2.27.5',
        'eslint-plugin-jsx-a11y': '^6.7.1',
        'eslint-plugin-prettier': '^4.2.1',
        'eslint-plugin-react': '^7.32.2',
        'eslint-plugin-react-hooks': '^4.6.0',
        jsdom: '^21.1.1',
        prettier: '^2.8.7',
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        sass: '^1.62.0',
        typescript: '^4.9.3',
        vite: '^4.2.0',
        'vite-tsconfig-paths': '^4.0.8',
        vitest: '^0.30.1',
      },
      peerDependencies: {
        react: '>=16.9.0',
        'react-dom': '>=16.9.0',
      },
    },
    'node_modules/@adobe/css-tools': {
      version: '4.2.0',
      resolved: 'https://registry.npmjs.org/@adobe/css-tools/-/css-tools-4.2.0.tgz',
      integrity:
        'sha512-E09FiIft46CmH5Qnjb0wsW54/YQd69LsxeKUOWawmws1XWvyFGURnAChH0mlr7YPFR1ofwvUQfcL0J3lMxXqPA==',
      dev: true,
    },
    'node_modules/@babel/code-frame': {
      version: '7.21.4',
      resolved: 'https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.21.4.tgz',
      integrity:
        'sha512-LYvhNKfwWSPpocw8GI7gpK2nq3HSDuEPC/uSYaALSJu9xjsalaaYFOq0Pwt5KmVqwEbZlDu81aLXwBOmD/Fv9g==',
      dev: true,
      dependencies: {
        '@babel/highlight': '^7.18.6',
      },
      engines: {
        node: '>=6.9.0',
      },
    },
    'node_modules/@babel/helper-validator-identifier': {
      version: '7.19.1',
      resolved:
        'https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.19.1.tgz',
      integrity:
        'sha512-awrNfaMtnHUr653GgGEs++LlAvW6w+DcPrOliSMXWCKo597CwL5Acf/wWdNkf/tfEQE3mjkeD1YOVZOUV/od1w==',
      dev: true,
      engines: {
        node: '>=6.9.0',
      },
    },
    'node_modules/@babel/highlight': {
      version: '7.18.6',
      resolved: 'https://registry.npmjs.org/@babel/highlight/-/highlight-7.18.6.tgz',
      integrity:
        'sha512-u7stbOuYjaPezCuLj29hNW1v64M2Md2qupEKP1fHc7WdOA3DgLh37suiSrZYY7haUB7iBeQZ9P1uiRF359do3g==',
      dev: true,
      dependencies: {
        '@babel/helper-validator-identifier': '^7.18.6',
        chalk: '^2.0.0',
        'js-tokens': '^4.0.0',
      },
      engines: {
        node: '>=6.9.0',
      },
    },
    'node_modules/@babel/highlight/node_modules/ansi-styles': {
      version: '3.2.1',
      resolved: 'https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz',
      integrity:
        'sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==',
      dev: true,
      dependencies: {
        'color-convert': '^1.9.0',
      },
      engines: {
        node: '>=4',
      },
    },
    'node_modules/@babel/highlight/node_modules/chalk': {
      version: '2.4.2',
      resolved: 'https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz',
      integrity:
        'sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==',
      dev: true,
      dependencies: {
        'ansi-styles': '^3.2.1',
        'escape-string-regexp': '^1.0.5',
        'supports-color': '^5.3.0',
      },
      engines: {
        node: '>=4',
      },
    },
    'node_modules/@babel/highlight/node_modules/color-convert': {
      version: '1.9.3',
      resolved: 'https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz',
      integrity:
        'sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==',
      dev: true,
      dependencies: {
        'color-name': '1.1.3',
      },
    },
    'node_modules/@babel/highlight/node_modules/color-name': {
      version: '1.1.3',
      resolved: 'https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz',
      integrity:
        'sha512-72fSenhMw2HZMTVHeCA9KCmpEIbzWiQsjN+BHcBbS9vr1mtt+vJjPdksIBNUmKAW8TFUDPJK5SUU3QhE9NEXDw==',
      dev: true,
    },
    'node_modules/@babel/highlight/node_modules/escape-string-regexp': {
      version: '1.0.5',
      resolved: 'https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-1.0.5.tgz',
      integrity:
        'sha512-vbRorB5FUQWvla16U8R/qgaFIya2qGzwDrNmCZuYKrbdSUMG6I1ZCGQRefkRVhuOkIGVne7BQ35DSfo1qvJqFg==',
      dev: true,
      engines: {
        node: '>=0.8.0',
      },
    },
    'node_modules/@babel/highlight/node_modules/has-flag': {
      version: '3.0.0',
      resolved: 'https://registry.npmjs.org/has-flag/-/has-flag-3.0.0.tgz',
      integrity:
        'sha512-sKJf1+ceQBr4SMkvQnBDNDtf4TXpVhVGateu0t918bl30FnbE2m4vNLX+VWe/dpjlb+HugGYzW7uQXH98HPEYw==',
      dev: true,
      engines: {
        node: '>=4',
      },
    },
  },
  dependencies: {
    '@adobe/css-tools': {
      version: '4.2.0',
      resolved: 'https://registry.npmjs.org/@adobe/css-tools/-/css-tools-4.2.0.tgz',
      integrity:
        'sha512-E09FiIft46CmH5Qnjb0wsW54/YQd69LsxeKUOWawmws1XWvyFGURnAChH0mlr7YPFR1ofwvUQfcL0J3lMxXqPA==',
      dev: true,
    },
    '@babel/code-frame': {
      version: '7.21.4',
      resolved: 'https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.21.4.tgz',
      integrity:
        'sha512-LYvhNKfwWSPpocw8GI7gpK2nq3HSDuEPC/uSYaALSJu9xjsalaaYFOq0Pwt5KmVqwEbZlDu81aLXwBOmD/Fv9g==',
      dev: true,
      requires: {
        '@babel/highlight': '^7.18.6',
      },
    },
    '@babel/helper-validator-identifier': {
      version: '7.19.1',
      resolved:
        'https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.19.1.tgz',
      integrity:
        'sha512-awrNfaMtnHUr653GgGEs++LlAvW6w+DcPrOliSMXWCKo597CwL5Acf/wWdNkf/tfEQE3mjkeD1YOVZOUV/od1w==',
      dev: true,
    },
  },
};
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
