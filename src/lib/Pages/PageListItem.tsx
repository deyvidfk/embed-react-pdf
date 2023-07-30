import { memo } from "react";
import { Page } from "react-pdf";
import { areEqual } from "react-window";
import { useControls } from "../Controls/useControls";

export const PageListItem = memo(({ index, style}: any) => {
    const { scale } = useControls()
    return (
        <div style={{ ...style }} className="mrc-embed-pdf__page-list-item-wrap" >
            <Page  
          
        
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale.value}
                className="mrc-embed-pdf__page-list-item"
                pageIndex={index}
            />
        </div>
    );
}, areEqual);

