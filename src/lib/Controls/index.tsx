type TControlContainer = {
  disabled?: boolean;
  as: React.ElementType;
};

export function ControlPanel({
  children,
  as: asProp,
}: React.PropsWithChildren<TControlContainer>) {
  const Component = asProp;
  return (
    <Component
      role="toolbar"
      aria-label="Barra de PDF"
      className="mrc-embed-pdf__toolbar"
    >
      {children}
    </Component>
  );
}
