import { render, waitFor, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { ControlsProvider } from "../../Controls/Provider";

describe("PageListItem", () => {
  it("Deve renderizar uma pagina", async () => {
    const PageMocked = jest.fn().mockImplementation(() => <>Pagina fake</>);

    jest.doMock("react-pdf", () => ({
      __esModule: true,
      Page: PageMocked,
      useDocumentContext: () => ({
        pdf: {
          numPages: 2,
          getPage: jest.fn().mockResolvedValue({
            getViewport: jest.fn().mockReturnValue({
              height: 100,
            }),
          }),
        },
      }),
    }));

    const scaleValue = 1.2;
    const indexValue = 1.2;
    const styleValue = { color: "red" };

    const Wrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
      <ControlsProvider
        pagination={{ total: 2, page: 1 }}
        rotate={90}
        scale={scaleValue}
      >
        {children}
      </ControlsProvider>
    );

    const { PageListItem } = await import("../PageListItem");

    render(
      <PageListItem id="page_list" index={indexValue} style={styleValue} />,
      { wrapper: Wrapper },
    );

    const re = document
      .getElementsByClassName("mrc-embed-pdf__page-list-item-wrap")
      .item(0) as HTMLElement;

    expect(re).toHaveStyle(styleValue);

    expect(PageMocked).toHaveBeenCalledWith(
      {
        className: "mrc-embed-pdf__page-list-item",
        pageIndex: indexValue,
        renderAnnotationLayer: false,
        renderTextLayer: false,
        scale: scaleValue,
      },
      {},
    );
  });
});
