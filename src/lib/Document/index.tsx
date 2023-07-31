import { useState, useRef, PropsWithChildren, useCallback } from "react";
import { Document, pdfjs } from "react-pdf";
import { PdfReaderProps } from "../types";
import { ControlsConsumer, ControlsProvider } from "../Controls/Provider";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export function DocumentRoot({
  src,
  children,
  onPdfAbstractEvents,
  slots,
  pdfLibRef: rootRef,
}: PropsWithChildren<PdfReaderProps>) {
  const [numPages, setNumPages] = useState(0);
  const LoadingRenderer = slots?.Loading || "Carregando...";
  const ErrorRenderer = slots?.Error || "Erro...";

  const handleEvents = useCallback(
    (name: any) => (value: any) => {
      if (onPdfAbstractEvents) {
        onPdfAbstractEvents({
          name,
          meta: value,
        });
      }
    },
    [onPdfAbstractEvents],
  );

  return (
    <ControlsProvider
      scale={1.2}
      pagination={{ page: 1, total: numPages }}
      rotate={0}
    >
      <ControlsConsumer>
        {(props) => (
          <Document
            error={ErrorRenderer}
            onError={handleEvents("GENERIC_ERROR")}
            onLoadError={handleEvents("LOAD_ERROR")}
            onSourceError={handleEvents("SOURCE_ERROR")}
            onLoadProgress={handleEvents("ONLOAD_PROGRESS")}
            className="mrc-embed-pdf__root"
            rotate={props?.rotate.value ?? 0}
            onLoadSuccess={(value) => {
              handleEvents("onLoadSuccess")(value);
              setNumPages(value.numPages);
            }}
            ref={rootRef}
            file={src}
            loading={<>{LoadingRenderer}</>}
          >
            {children}
          </Document>
        )}
      </ControlsConsumer>
    </ControlsProvider>
  );
}
