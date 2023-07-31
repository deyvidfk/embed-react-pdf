import { act, renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { usePageFit } from "..";
import { ControlsProvider } from "../../../Controls/Provider";

jest.mock("@wojtekmaj/react-hooks", () => ({
  __esModule: true,
  useWindowWidth: () => 1024,
}));

describe("usePageFit", () => {
  test("Deve ajustar a escala para ocultar toda a tela", async () => {
    function Wrapper({ children }: PropsWithChildren<unknown>) {
      return <ControlsProvider scale={1}>{children}</ControlsProvider>;
    }

    const pdfDocument = {
      getPage: jest.fn().mockResolvedValue({
        getViewport: jest.fn().mockReturnValue({
          width: 512,
        }),
      }),
    };
    const { result, waitForNextUpdate } = renderHook(
      () => usePageFit(pdfDocument as any),
      { wrapper: Wrapper },
    );

    act(() => {
      result.current.fitToWidth();
    });

    await waitForNextUpdate();

    expect(result.current.scale).toEqual(2);
  });
});
