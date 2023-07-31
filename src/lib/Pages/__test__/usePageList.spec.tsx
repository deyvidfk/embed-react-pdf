import { renderHook } from '@testing-library/react-hooks';
import { FC, PropsWithChildren } from 'react';
import { usePageList } from '../usePageList';
import { ControlsProvider } from '../../Controls/Provider';

describe('usePageList', () => {
  test('Deve criar uma instancia valida do hook', async () => {
    const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => <ControlsProvider>{children}</ControlsProvider>;
    const pageListArg = {
      numPages: 1,
      getPage: jest.fn().mockResolvedValue({
        getViewport: jest.fn().mockReturnValue({
          height: 10,
          width: 10,
        }),
      }),
    };

    const { result, waitForNextUpdate } = renderHook(
      () => usePageList(pageListArg as any),
      { wrapper: Wrapper },
    );

    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        getPageHeight: expect.anything(),
        pages: expect.anything(),
      }),
    );
  });

  test('Deve tentar obter a altura da pagina', async () => {
    const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => <ControlsProvider>{children}</ControlsProvider>;
    const pageHeight = 10;
    const pageListArg = {
      numPages: 1,
      getPage: jest.fn().mockResolvedValue({
        getViewport: jest.fn().mockReturnValue({
          height: pageHeight,
          width: 10,
        }),
      }),
    };
    const { result, waitForNextUpdate } = renderHook(
      () => usePageList(pageListArg as any),
      { wrapper: Wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.getPageHeight(0)).toEqual(pageHeight);
  });
});
