import {
  FC,
  LabelHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useControls } from "../useControls";
import React from "react";

type TRenderer = () => ReactNode;
type TLabelProps = { value: string; props?: LabelHTMLAttributes<unknown> };

type TRotateControl = {
  onChange?: ({ degree }: { degree: number }) => void;
  label: TRenderer | ReactNode | TLabelProps;
  inputAs?: React.ElementType;
};
function isLabelProps(value: unknown): value is TLabelProps {
  return Object.prototype.hasOwnProperty.call(value, "value");
}

const RotateControl: FC<TRotateControl> = ({ inputAs, onChange, label }) => {
  const { rotate } = useControls();
  const [inputRef, setInputRef] = useState(rotate.value);

  useEffect(() => {
    setInputRef(rotate.value);
    if (onChange) onChange({ degree: rotate.value });
  }, [rotate.value]);

  const labelRendered = useMemo(() => {
    if (typeof label == "string") {
      <label htmlFor="pdf-scale-control-zoom">
        {" "}
        {label}: {rotate.value}
      </label>;
    }
    if (isLabelProps(label)) {
      return (
        <label className="mrc-embed-pdf__control-scale-label" {...label?.props}>
          {label.value}: {rotate.value}
        </label>
      );
    }
    return label;
  }, [label]);

  const extraButtonProps =
    inputAs == "input"
      ? { type: "range", defaultValue: 0, min: 0, max: 270, step: 90 }
      : {};

  const defaultButtonProps = {
    className: "mrc-embed-pdf__control-input",
    onChange: (eve: any) => {
      rotate.set(Number(eve.currentTarget.value));
      setInputRef(Number(eve.currentTarget.value));
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

RotateControl.defaultProps = {
  inputAs: "input",
};
export { RotateControl };
