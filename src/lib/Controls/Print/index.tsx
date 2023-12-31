import React, { FC } from "react";
import printJS from "print-js";

type TScaleControl = {
  src: string;
  as?: React.ElementType;
};

const PrintControl: FC<TScaleControl> = ({
  src,
  as: asProp,
  children,
  ...restProps
}) => {
  const extraButtonProps = asProp == "button" ? { type: "button" } : {};

  const defaultButtonProps = {
    ...restProps,
    ...extraButtonProps,
    onClick: () => {
      printJS({ printable: src, type: "pdf" });
    },
  };

  return React.createElement(asProp!, { ...defaultButtonProps }, children);
};

PrintControl.defaultProps = {
  as: "button",
};

export { PrintControl };
