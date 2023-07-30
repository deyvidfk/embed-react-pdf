import React from "react";
import { FC, useEffect, useRef } from "react";


const usePrinter = () => {

    const iframeRef = useRef<HTMLIFrameElement>()

    useEffect(() => {
        return () => {
            if (iframeRef.current) {
                document.body.removeChild(iframeRef.current)
            }
        }
    })

    function delegateToPrinter(src: string) {
        iframeRef.current = document.createElement('iframe');
        iframeRef.current.className = 'pdfIframe'
        document.body.appendChild(iframeRef.current);
        iframeRef.current.style.display = 'none';
        iframeRef.current.onload = function () {
            setTimeout(function () {
                if (iframeRef.current) {
                    iframeRef.current.focus();

                    if (iframeRef.current.contentWindow) {
                        iframeRef.current.contentWindow?.print();
                        URL.revokeObjectURL(src)
                    }

                }



            }, 1);
        };
        iframeRef.current.src = src;
        // URL.revokeObjectURL(url)
    }

    return { delegateToPrinter }
}
type TScaleControl = {
    src: string
    as?: React.ElementType
}

const PrintControl: FC<TScaleControl> = ({ src, as: asProp, children, ...restProps }) => {

    const { delegateToPrinter } = usePrinter()

    const extraButtonProps = asProp == "button" ? { type: "button" } : {}

    const defaultButtonProps = {
        ...restProps, ...extraButtonProps, onClick: () => {
            delegateToPrinter(src)
        }
    }

    return React.createElement(asProp!, { ...defaultButtonProps }, children)
}


PrintControl.defaultProps = {
    as: "button"
}

export { PrintControl }