import { ReactNode, LabelHTMLAttributes } from "react";

export type TRenderer = () => ReactNode;
export type TLabelProps = {
  value: string;
  props?: LabelHTMLAttributes<unknown>;
};
export type TScaleControl = {
  onChange?: ({ scale }: { scale: number }) => void;
  label: TRenderer | ReactNode | TLabelProps;
  inputAs?: React.ElementType;
};
