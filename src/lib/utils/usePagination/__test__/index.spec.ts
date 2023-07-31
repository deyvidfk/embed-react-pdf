import { act, renderHook } from '@testing-library/react-hooks';
import { usePagination } from '..';

describe('usePagination', () => {
  test('Deve inicializar o hook com os argumentos corretamente', () => {
    const { result } = renderHook(() => usePagination({ page: 2, pagesCount: 10 }));
    expect(result.current.currentPage).toEqual(2);
    expect(result.current.pagesCount).toEqual(10);
  });

  test('Deve inicializar a propriedade de pagina automaticamente', () => {
    const { result } = renderHook(() => usePagination({ pagesCount: 10 }));

    expect(result.current.currentPage).toEqual(1);
  });

  test('Deve ir para primeira pagina', async () => {
    const { result } = renderHook(() => usePagination({ page: 5, pagesCount: 10 }));

    act(() => {
      result.current.firstPage();
    });

    expect(result.current.currentPage).toEqual(1);
  });

  test('Deve ir para ultima pagina', () => {
    const initPageCount = 10;

    const { result } = renderHook(() => usePagination({ pagesCount: initPageCount }));

    act(() => {
      result.current.lastPage();
    });

    expect(result.current.currentPage).toEqual(initPageCount);
  });

  test('Deve ir para proxima pagina', () => {
    const initPage = 2;

    const { result } = renderHook(() => usePagination({ page: initPage, pagesCount: 10 }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toEqual(initPage + 1);
  });

  test('Deve ir proxima pagina caso pagina atual nao seja a ultima pagina', () => {
    const initPageCount = 10;
    const initPage = initPageCount;

    const { result } = renderHook(() => usePagination({ page: initPage, pagesCount: initPageCount }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toEqual(initPage);

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toEqual(initPage);
  });

  test('Deve voltar pagina caso pagina atual nao seja a primeira pagina', () => {
    const initPage = 2;

    const { result } = renderHook(() => usePagination({ page: initPage, pagesCount: 10 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toEqual(1);

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toEqual(1);
  });

  test('Deve ir voltar uma pagina', () => {
    const initPage = 2;

    const { result } = renderHook(() => usePagination({ page: initPage, pagesCount: 10 }));

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.currentPage).toEqual(initPage - 1);
  });
});
