import React, {
  ButtonHTMLAttributes,
  ComponentType,
  FC,
  ReactElement,
  ReactNode,
} from "react";

export type TFullScreenControl = {
  containerId?: string;
  as?: React.ElementType;
};

export const useFullScreenControl = () => {
  function toggleFullscreen(containerId?: string) {
    var elem = containerId ? document.getElementById(containerId) : document;

    if (elem && "requestFullscreen" in elem) {
      elem.requestFullscreen();
    }
  }
  return { toggleFullscreen };
};

const FullScreenControl: FC<TFullScreenControl> = ({
  children,
  containerId,
  as: asProp,
  ...restProps
}) => {
  const { toggleFullscreen } = useFullScreenControl();

  const extraButtonProps = asProp == "button" ? { type: "button" } : {};

  const defaultButtonProps = {
    ...restProps,
    ...extraButtonProps,
    onClick: () => {
      toggleFullscreen(containerId);
    },
  };

  return React.createElement(asProp!, { ...defaultButtonProps }, children);
};

FullScreenControl.defaultProps = {
  as: "button",
};

export { FullScreenControl };
