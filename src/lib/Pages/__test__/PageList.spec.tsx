import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { PageList } from '../PageList';
import { ControlsProvider } from '../../Controls/Provider';

jest.mock('react-pdf', () => ({
  __esModule: true,
  Page: ({ index }: any) => (
    <>
      Pagina fake -
      {index}
    </>
  ),
  useDocumentContext: () => ({
    pdf: {
      numPages: 2,
      getPage: jest.fn().mockResolvedValue({
        getViewport: jest.fn().mockReturnValue({
          height: 100,
        }),
      }),
    },
  }),
}));

it('Deve renderizar a lista de paginas', async () => {
  const Wrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
    <ControlsProvider
      pagination={{ total: 2, page: 1 }}
      rotate={90}
      scale={1}
    >
      {children}
    </ControlsProvider>
  );

  render(<PageList id="page_list" />, { wrapper: Wrapper });

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, 100);
  });

  expect(screen.getAllByText(/Pagina fake/)).toHaveLength(2);
});

it('Deve anexar o id', async () => {
  const Wrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
    <ControlsProvider
      pagination={{ total: 2, page: 1 }}
      rotate={90}
      scale={1}
    >
      {children}
    </ControlsProvider>
  );

  const id = 'page_list';

  const { container } = render(<PageList id={id} />, { wrapper: Wrapper });

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, 100);
  });

  expect(container.querySelector(`#${id}`)).toBeInTheDocument();
});
