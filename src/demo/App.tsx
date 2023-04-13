import { FC } from 'react';
import { JSONRenderer } from '~/lib';
import { JSONEditor } from '~/old-lib';

import './App.css';

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

const App: FC = () => {
  console.log('App');

  return (
    <div className='App'>
      <header>
        <h1>JSONEditor Demo</h1>
      </header>
      <menu>
        <h2>Select demo</h2>
        <ul>
          <li>With empty object</li>
          <li>With empty array</li>
        </ul>
      </menu>
      <div className='card'>
        <JSONRenderer data={source}>
          <JSONRenderer.Editor />
        </JSONRenderer>
        {/* 
        <JSONRenderer data={{}}>
          <JSONRenderer.Editor />
        </JSONRenderer>
        <JSONRenderer data={[]}>
          <JSONRenderer.Editor />
        </JSONRenderer>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc' }]}>
          <JSONRenderer.Editor />
        </JSONRenderer> */}
      </div>
      <div className='card'>
        <JSONEditor
          data={[1, 2, 'a', 'b', {}, [], { field: 'abc' }]}
          view='single'
          collapsible
          onChange={console.log}
        />
      </div>
      <div className='card mobile'>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc' }]}>
          <JSONRenderer.Editor />
        </JSONRenderer>
      </div>
      {/*       <div className='card'>
        <ExpansionTree
          data={[
            {
              id: '1',
              title: 'Root',
              allowScrollTo: true,
              canAdd: true,
              children: [<p key='1.child_1'>Child 1</p>],
            },
          ]}
        />
      </div> */}

      <div className='card'>
        <JSONRenderer data={{}}>
          <JSONRenderer.Viewer />
        </JSONRenderer>
        <JSONRenderer data={[]}>
          <JSONRenderer.Viewer />
        </JSONRenderer>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc', done: true }, null, false]}>
          <JSONRenderer.Viewer />
        </JSONRenderer>
      </div>
      <div className='card mobile'>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc', done: true }, null, false]}>
          <JSONRenderer.Viewer />
        </JSONRenderer>
      </div>
      <div className='card'>
        <JSONRenderer data={{}}>
          <JSONRenderer.Editor />
          <JSONRenderer.Viewer />
        </JSONRenderer>
        <JSONRenderer data={[]}>
          <JSONRenderer.Viewer />
          <JSONRenderer.Editor />
        </JSONRenderer>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc', done: true }, null, false]}>
          <JSONRenderer.Editor />
          <JSONRenderer.Viewer />
        </JSONRenderer>
      </div>
      <div className='card mobile'>
        <JSONRenderer data={[1, 2, 'a', 'b', {}, [], { field1: 'abc', done: true }, null, false]}>
          <JSONRenderer.Editor />
          <JSONRenderer.Viewer />
        </JSONRenderer>
      </div>
    </div>
  );
};

export default App;
