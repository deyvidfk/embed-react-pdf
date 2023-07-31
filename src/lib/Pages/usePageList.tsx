import { asyncMap } from '@wojtekmaj/async-array-utils';
import { useState, useEffect, useCallback } from 'react';
import { pdfjs } from 'react-pdf';
import { useControls } from '../Controls/useControls';

export const usePageList = (
  documentInstance: false | pdfjs.PDFDocumentProxy | undefined,
) => {
  const [documentRef] = useState<false | pdfjs.PDFDocumentProxy | undefined>(
    documentInstance,
  );
  const [pageViewPort, setPageViewPort] = useState(null);
  const { scale } = useControls();

  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  useEffect(() => {
    setPageViewPort(null);
    if (!documentRef) {
      return;
    }

    (async () => {
      const pageNumbers = Array.from(new Array(documentRef.numPages)).map(
        (_, index) => index + 1,
      );

      const nextPageViewPorts = await asyncMap(pageNumbers, (pageNumber) => documentRef.getPage(pageNumber).then((page: pdfjs.PDFPageProxy) => {
        const r = page.getViewport({ scale: scale.value });
        return r;
      }));

      setPageViewPort(nextPageViewPorts as any);
    })();
  }, [documentRef, scale.value]);

  const getPageHeight = useCallback(
    (pageIndex: number) => {
      if (!pageViewPort) {
        throw new Error('getPageHeight() called too early');
      }

      const pageViewport = pageViewPort[pageIndex] as any;

      return pageViewport.height;
    },
    [pageViewPort, scale.value],
  );

  return {
    getPageHeight,
    pages: pageViewPort,
  };
};
