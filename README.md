# React Simple JSON Renderer

Another React JSON editor/viewer, started as an attempt to reimplement with TypeScript in mind of [JSONEditor](https://github.com/constantoduol/JSONEditor.git) by [Constant Oduol](https://github.com/constantoduol) but ended up as a build from the ground up with some style similarities.

## Installation

```cli
npm i react-simple-json-renderer
```

## Usage

```TypeScript
import { JSONRenderer } from "react-simple-json-renderer";
import "react-simple-json-renderer/dist/style.css";

const someData = {
  num: 1979,
  str: 'abc',
  flag: false,
  list: [1,2,3],
  obj: { name: "Lukasz" }
}

// Editor only
<JSONRenderer data={someData}>
  <JSONRenderer.Editor />
</JSONRenderer>

// Viewer only
<JSONRenderer data={someData}>
  <JSONRenderer.Viewer />
</JSONRenderer>

// Both
<JSONRenderer data={someData}>
  <JSONRenderer.Editor />
  <JSONRenderer.Viewer />
</JSONRenderer>

```
