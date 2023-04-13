import { vi } from 'vitest';
import { uniqueId } from './uniqueId';

describe('utils', () => {
  describe('string', () => {
    describe('uniqueId', () => {
      it('uniqueId returns correct values', () => {
        const MockedMath = {
          random: vi.fn().mockImplementation(() => 1),
          round: vi.fn(Math.round),
        };
        vi.stubGlobal('Math', MockedMath);

        const date = new Date(2018, 4, 8);
        const MockedDate = vi.fn().mockImplementation(() => date);

        vi.stubGlobal('Date', MockedDate);

        const unique = uniqueId();
        expect(unique).toEqual('JGWUMOW0-1NJCHS-1NJCHS');

        vi.unstubAllGlobals();
      });
    });
  });
});
