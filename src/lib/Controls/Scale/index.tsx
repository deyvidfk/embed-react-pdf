import React, {
  ElementType,
  FC,
  LabelHTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWindowWidth } from '@wojtekmaj/react-hooks';
import { pdfjs, useDocumentContext } from 'react-pdf';
import { useControls } from '../useControls';

type TRenderer = () => ReactNode;
type TLabelProps = { value: string; props?: LabelHTMLAttributes<unknown> };
type TScaleControl = {
  onChange?: ({ scale }: { scale: number }) => void;
  label: TRenderer | ReactNode | TLabelProps;
  inputAs?: React.ElementType;
};

function isLabelProps(value: unknown): value is TLabelProps {
  return Object.prototype.hasOwnProperty.call(value, 'value');
}

const calcScaleFn = (pageWidth: number, windowWidth: number) => {
  const width = Math.round(windowWidth ?? 0) / Math.round(pageWidth);
  return width;
};

const usePageFit = (
  documentInstance: false | pdfjs.PDFDocumentProxy | undefined,
) => {
  const windowWidth = useWindowWidth();
  const { scale } = useControls();

  const fitToWidth = useCallback(
    (pageIndex = 1) => {
      if (documentInstance) {
        documentInstance
          .getPage(pageIndex)
          .then((page: any) => page.getViewport({ scale: scale.value }))
          .then((page: pdfjs.PDFPageProxy) => {
            if ('width' in page) {
              scale.set(calcScaleFn(Number(page.width), windowWidth ?? 0));
            }
          });
      }
    },
    [windowWidth, scale],
  );

  return fitToWidth;
};

const ScaleControl: FC<TScaleControl> = ({ inputAs, onChange, label }) => {
  const { scale } = useControls();
  const dc = useDocumentContext();
  const fitToWidth = usePageFit(dc?.pdf);

  useEffect(() => {
    if (onChange) onChange({ scale: scale.value });
  }, [scale]);

  const labelRendered = useMemo(() => {
    if (typeof label === 'string') {
      return (
        <label className="mrc-embed-pdf__control-scale-label">{label}</label>
      );
    }
    if (isLabelProps(label)) {
      return (
        <label className="mrc-embed-pdf__control-scale-label" {...label?.props}>
          {label.value}
        </label>
      );
    }
    return label;
  }, [label]);

  const extraButtonProps = inputAs == 'input'
    ? {
      type: 'range', defaultValue: 1, min: 1, max: 3, step: 0.25,
    }
    : {};

  const defaultButtonProps = {
    className: 'mrc-embed-pdf__control-input',
    onChange: (eve: any) => {
      scale.set(Number(eve.currentTarget.value));
    },
    ...extraButtonProps,
  };

  return (
    <>
      <button onClick={() => fitToWidth(1)}>Ajustar à largura</button>
      {labelRendered}
      {React.createElement(inputAs!, { ...defaultButtonProps })}
    </>
  );
};

ScaleControl.defaultProps = {
  inputAs: 'input',
};

export { ScaleControl };
