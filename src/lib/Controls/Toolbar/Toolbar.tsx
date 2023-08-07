type TToolbar = {
  disabled?: boolean;
  as: React.ElementType;
};

export function Toolbar({
  children,
  as: asProp,
}: React.PropsWithChildren<TToolbar>) {
  const Component = asProp;
  return (
    <div style={{ display: "flex", flex: "1", overflow: "auto", justifyContent: "center" }}>
      <Component
        role="toolbar"
        aria-label="Barra de PDF"
        className="mrc-embed-pdf__toolbar"
      >
        {children}
      </Component></div>
  );
}
