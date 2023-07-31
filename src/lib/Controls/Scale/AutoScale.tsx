import React, { FC } from 'react';
import { useDocumentContext } from 'react-pdf';
import { usePageFit } from '../../utils/usePageFit';

const AutoScale: FC<{ as?: React.ElementType }> = ({
  children,
  as: asProp,
  ...restProps
}) => {
  const dc = useDocumentContext();
  const fitToWidth = usePageFit(dc?.pdf);

  const extraButtonProps = asProp == 'button' ? { type: 'button' } : {};

  const defaultButtonProps = {
    ...restProps,
    ...extraButtonProps,
    onClick: () => fitToWidth.fitToWidth(),
  };

  return React.createElement(asProp!, { ...defaultButtonProps }, children);
};

AutoScale.defaultProps = {
  as: 'button',
};

export { AutoScale };
