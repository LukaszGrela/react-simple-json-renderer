import { vi } from 'vitest';
import { uniqueId } from './uniqueId';

describe('utils', () => {
  describe('string', () => {
    describe('uniqueId', () => {
      it('uniqueId returns correct values', () => {
        const MockedMath = {
          random: vi.fn().mockImplementation(() => 1),
          round: vi.fn(Math.round),
          min: vi.fn(Math.min),
          floor: vi.fn(Math.floor),
          ceil: vi.fn(Math.ceil),
        };
        vi.stubGlobal('Math', MockedMath);

        const date = new Date(2018, 4, 8, 1, 1, 1, 1);
        const MockedDate = vi.fn().mockImplementation(() => date);

        vi.stubGlobal('Date', MockedDate);

        const unique = uniqueId();
        expect(unique).toEqual('JGWUNZYH-1NJCHS-1NJCHS');

        vi.unstubAllGlobals();
      });
    });
  });
});
