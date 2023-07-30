import {
  PropsWithChildren, createContext, useMemo, useState,
} from 'react';
import { TControlsProviderResult, TControlsProviderValue } from '../types';

export const ControlsContext = createContext<TControlsProviderResult | null>(
  null,
);

export const ControlsProvider: React.FC<
  PropsWithChildren<TControlsProviderValue>
> = ({
  rotate, scale, pagination, children,
}) => {
  const [scaleValue, setScaleValue] = useState(scale ?? 1);
  const [pageValue, setPageValue] = useState(pagination?.page ?? 1);
  const [rotateValue, setRotate] = useState(rotate ?? 0);

  const forwardValue: TControlsProviderResult = useMemo(() => ({
    rotate: {
      value: rotateValue,
      set(value) {
        setRotate(value);
      },
    },
    scale: {
      value: scaleValue,
      set(value) {
        setScaleValue(value);
      },
    },
    pagination: {
      page: {
        value: pageValue,
        set(value) {
          setPageValue(value);
        },
      },
      total: {
        value: pagination?.total ?? 0,
      },
    },
  }), [scaleValue, pageValue, rotateValue, pagination?.total]);

  return (
    <ControlsContext.Provider value={{ ...forwardValue }}>
      {children}
    </ControlsContext.Provider>
  );
};
export const ControlsConsumer = ControlsContext.Consumer;
