export function useMockedConsole() {
  beforeEach(() => {
    vi.stubGlobal("console", { warn: vi.fn() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
