import parseAsJSON from '../libs/utils/parseAsJSON';

describe("Check to 'parseAsJSON' method.", () => {
  test('The json should be correct.', () => {
    expect(parseAsJSON('{"name":"rohmad"}')['name']).toBe('rohmad');
  });

  test('The json should be not error.', () => {
    expect(parseAsJSON('')).toBeTruthy();
  });
});
