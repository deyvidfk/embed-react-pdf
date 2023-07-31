import { useEffect, useState } from 'react';

type THookValue = {
  pagesCount: number;
  page?: number;
  onChangeValue?: (value: number) => void;
};

export const usePagination = ({
  pagesCount,
  page = 1,
  onChangeValue,
}: THookValue) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  function previousPage() {
    setCurrentPage((v: number) => {
      if (v > 1) {
        const ret = v - 1;
        setTimeout(() => {
          if (onChangeValue) onChangeValue(ret);
        }, 0);
        return ret;
      }
      return v;
    });
  }

  function nextPage() {
    setCurrentPage((v: number) => {
      if (v < pagesCount) {
        const ret = v + 1;

        setTimeout(() => {
          if (onChangeValue) onChangeValue(ret);
        }, 0);

        return ret;
      }

      return v;
    });
  }

  function lastPage() {
    setCurrentPage((_v: number) => {
      const ret = pagesCount;

      setTimeout(() => {
        if (onChangeValue) onChangeValue(ret);
      }, 0);
      return ret;
    });
  }

  function firstPage() {
    setCurrentPage((_v: number) => {
      const ret = 1;
      setTimeout(() => {
        if (onChangeValue) onChangeValue(ret);
      }, 0);
      return ret;
    });
  }

  return {
    setCurrentPage,
    firstPage,
    lastPage,
    nextPage,
    previousPage,
    currentPage,
    pagesCount,
  };
};
