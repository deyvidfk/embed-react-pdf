import { MutableRefObject } from 'react';

export interface TGetter<T> {
  value: T;
}

export interface TSetter<T> {
  set: (value: T) => void;
}

export interface TGetterSetter<T> extends TGetter<T>, TSetter<T> {}

export type TPagination = {
  page: TGetterSetter<number>;
  total: TGetter<number>;
};

export type TControlsProviderResult = {
  rotate: TGetterSetter<number>;
  scale: TGetterSetter<number>;
  pagination: TPagination;
};

export type TControlsProviderValue = {
  scale?: number;
  rotate?: number;
  pagination?: { page: number; total: number };
};

export type TPaginationContext = {
  page: number;
  total: number;
  toGo: (page: number) => void;
};

export type OnHandler = {
  name: 'GENERIC_ERROR' | 'LOAD_ERROR' | 'SOURCE_ERROR' | 'ONLOAD_PROGRESS';
  meta: unknown;
};

export type TLayout = {
  backgroundColor: string;
  pageColor: string;
};

export type PdfReaderProps = {
  src: string;
  pdfLibRef?: MutableRefObject<unknown>;
  slots?: {
    Loading?: React.ComponentType;
    Error?: React.ComponentType;
  };
  onPdfAbstractEvents?: (value: OnHandler) => void;
};
