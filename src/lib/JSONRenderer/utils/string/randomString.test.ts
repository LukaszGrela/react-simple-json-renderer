import { vi } from 'vitest';
import { randomString } from './randomString';

describe('utils', () => {
  describe('string', () => {
    describe('randomString', () => {
      it('randomString returns correct values', () => {
        const MockedMath = {
          random: vi.fn().mockImplementation(() => 1),
          round: vi.fn(Math.round),
        };
        vi.stubGlobal('Math', MockedMath);

        const random = randomString();
        expect(random).toEqual('1njchs');

        vi.unstubAllGlobals();
      });
    });
  });
});
