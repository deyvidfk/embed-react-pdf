import React, { FC } from 'react';
import screenfull from 'screenfull';

export type TFullScreenControl = {
  containerId?: string;
  as?: React.ElementType;
};

const FullScreenControl: FC<TFullScreenControl> = ({
  children,
  containerId,
  as: asProp,
  ...restProps
}) => {
  const extraButtonProps = asProp == 'button' ? { type: 'button' } : {};

  const defaultButtonProps = {
    ...restProps,
    ...extraButtonProps,
    onClick: () => {
      if (screenfull.isEnabled) {
        let ele;
        if (containerId) {
          ele = document.querySelector(containerId);
        }
        screenfull.request(ele ?? undefined);
      }
    },
  };

  return React.createElement(asProp!, { ...defaultButtonProps }, children);
};

FullScreenControl.defaultProps = {
  as: 'button',
};

export { FullScreenControl };
