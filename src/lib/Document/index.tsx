import { useState, useRef, PropsWithChildren } from "react";
import { Document, } from "react-pdf";
import { PdfReaderProps } from "../types";
import { ControlsConsumer, ControlsProvider } from "../Controls/Provider";

export function DocumentRoot({ src, children, LoadingRenderer: LoadingRendererProp }: PropsWithChildren<PdfReaderProps>) {
    const docRef = useRef()
    const [numPages, setNumPages] = useState(0)
    const LoadingRenderer = LoadingRendererProp ? LoadingRendererProp : "Carregando..."
    return (
        <ControlsProvider scale={1.2} pagination={{ page: 1, total: numPages }} rotate={0}>
            <ControlsConsumer>
                {(props) => {
                    return <Document      
                                      
                        className={"mrc-embed-pdf__root"}
                        rotate={props?.rotate.value ?? 0}
                        onLoadSuccess={({ numPages }) => {
                            setNumPages(numPages)
                        }}
                        ref={docRef}
                        file={src}
                        loading={<>{LoadingRenderer}</>}
                    >
                        {children}                        
                    </Document>
                }}
            </ControlsConsumer>
        </ControlsProvider>
    );
}
