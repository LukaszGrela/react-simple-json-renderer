import traverse, { copyObject } from './traverse';

describe('JSONRenderer', () => {
  describe('utils', () => {
    describe('object', () => {
      describe('traverse', () => {
        describe('function traverse', () => {
          it('deletes non parseable content', () => {
            const consoleWarn = vi.fn().mockImplementation(() => {
              return undefined;
            });
            const MockedConsole = {
              warn: consoleWarn,
            };
            vi.stubGlobal('console', MockedConsole);
            const data = {
              hugeOne: BigInt(9007199254740991),
              symbol: Symbol('test'),
              nullValue: null,
              undefinedValue: undefined,
            };
            expect(traverse(data)).toStrictEqual({ nullValue: null });
            expect(consoleWarn).toHaveBeenCalledTimes(3);
            vi.unstubAllGlobals();
          });
          it('Allow user to replace non-parseable with other content', () => {
            const consoleWarn = vi.fn().mockImplementation(() => {
              return undefined;
            });
            const MockedConsole = {
              warn: consoleWarn,
            };

            vi.stubGlobal('console', MockedConsole);
            const data = {
              hugeOne: BigInt(9007199254740991),
              symbol: Symbol('test'),
              nullValue: null,
              undefinedValue: undefined,
            };
            expect(
              traverse(data, function replaceNonParseable<
                T = unknown,
                Out = unknown,
              >(j: T, _1?: string, _2?: number, isNonParseable?: boolean): Out | undefined {
                if (isNonParseable) {
                  return `Invalid content: (type: ${typeof j})` as Out;
                }
                return j as unknown as Out;
              }),
            ).toStrictEqual({
              hugeOne: 'Invalid content: (type: bigint)',
              nullValue: null,
              symbol: 'Invalid content: (type: symbol)',
              undefinedValue: 'Invalid content: (type: undefined)',
            });
            expect(consoleWarn).not.toBeCalled();

            vi.unstubAllGlobals();
          });

          it('removes circular reference', () => {
            const consoleWarn = vi.fn().mockImplementation(() => {
              return undefined;
            });
            const MockedConsole = {
              warn: consoleWarn,
            };
            vi.stubGlobal('console', MockedConsole);
            const person: any = {
              firstName: 'Lukasz',
            };

            const json = {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              dig: { deeper: { person } },
            };
            person.nested = { deepely: { circular: person } };

            expect(traverse(json)).toStrictEqual({
              dig: {
                deeper: {
                  person: {
                    firstName: 'Lukasz',
                    nested: {
                      deepely: {},
                    },
                  },
                },
              },
            });
            expect(consoleWarn).toHaveBeenCalledTimes(1);
            vi.unstubAllGlobals();
          });
        });
        describe('function copyObject', () => {
          it('copies object', () => {
            const data = { a: 1, b: 'b', c: true };
            expect(copyObject(data)).toStrictEqual(data);
          });
          it('copies and applies transformation from callback', () => {
            const data = { a: 1, b: 'b', c: true };
            expect(
              copyObject(data, <T = unknown>(): T => {
                return 1 as T;
              }),
            ).toStrictEqual(1);
          });
        });
      });
    });
  });
});
