// add following to your typings e.g. lodash-override.d.ts
export {};

type TOptionalTuple<Field, Value> = Value extends undefined
  ? [never, never]
  : [field: Field, value: Value];

const tuple: TOptionalTuple<'test', 1> = ['test', 1];
console.log(tuple);

type TTuple<O> = {
  [Field in keyof O]: TOptionalTuple<Field, O[Field]>;
}[keyof O];

declare module 'lodash' {
  interface LoDashStatic {
    toPairs<O>(object?: O): TTuple<O>[];
    entries<O>(object?: O): TTuple<O>[];
  }
}

declare module 'lodash' {
  interface LoDashStatic {
    keys<O>(object?: O): (keyof O)[];
  }
}
