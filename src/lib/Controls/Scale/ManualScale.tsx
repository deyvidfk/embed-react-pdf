import React, { FC, useEffect, useMemo } from 'react';
import { useControls } from '../useControls';
import { TScaleControl } from './types';
import { isLabelProps } from './utils';

const ManualScale: FC<TScaleControl> = ({ inputAs, onChange, label }) => {
  const { scale } = useControls();

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
      type: 'range',
      defaultValue: 1,
      min: 1,
      max: 3,
      step: 0.25,
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
      {labelRendered}
      {React.createElement(inputAs!, { ...defaultButtonProps })}
    </>
  );
};

ManualScale.defaultProps = {
  inputAs: 'input',
};

export { ManualScale };
