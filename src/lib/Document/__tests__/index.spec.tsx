import {
  act, render, screen, waitFor, cleanup,
} from '@testing-library/react';
import { DocumentRoot } from '..';

jest.mock('react-pdf', () => ({
  __esModule: true,
  ...jest.requireActual('react-pdf'),
  Document: ({ children }: any) => <>{children}</>,
}));

describe('DocumentRoot', () => {
  beforeAll(() => {
    cleanup();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Deve exibir o componente de carregamento', async () => {
    const {} = render(
      <DocumentRoot
        onPdfAbstractEvents={(ev) => {
          console.log(ev);
        }}
        src="http://"
      >
        Page Fake
      </DocumentRoot>,
    );

    act(async () => {
      await Promise.resolve(setTimeout);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Page Fake/)).toBeInTheDocument();
    });
  });
});
