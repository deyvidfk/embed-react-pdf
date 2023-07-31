import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { useCallback } from "react";
import { pdfjs } from "react-pdf";
import { useControls } from "../../Controls/useControls";

export const calcScaleFn = (pageWidth: number, windowWidth: number) => {
  const width = Math.round(windowWidth ?? 0) / Math.round(pageWidth);
  return width;
};

export const usePageFit = (
  documentInstance: false | pdfjs.PDFDocumentProxy | undefined,
) => {
  const windowWidth = useWindowWidth();
  const { scale } = useControls();

  const fitToWidth = useCallback(
    (pageIndex?: number) => {
      if (documentInstance) {
        documentInstance
          .getPage(pageIndex ?? 1)
          .then((page: any) => page.getViewport({ scale: scale.value }))
          .then((page: pdfjs.PDFPageProxy) => {
            if ("width" in page) {
              scale.set(calcScaleFn(Number(page.width), windowWidth ?? 0));
            }
          });
      }
    },
    [windowWidth, scale],
  );

  return { fitToWidth, scale: scale.value };
};
