// import { renderHook } from "@testing-library/react-hooks";
// import { bottomPageMarginPx, usePageList } from "../usePageList";
// import { ControlsProvider } from "../../Controls/Provider";
// import { FC, PropsWithChildren } from "react";

// describe('usePageList', () => {
//    test('Deve criar uma instancia valida do hook', async () => {

//       const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
//          return <ControlsProvider >{children}</ControlsProvider>
//       }
//       const pageListArg = {
//          numPages: 1, getPage: jest.fn().mockResolvedValue({
//             getViewport: jest.fn().mockReturnValue({
//                height: 10
//             })
//          })
//       }
//       const { result, waitForNextUpdate } = renderHook(() => usePageList(pageListArg), { wrapper: Wrapper })

//       await waitForNextUpdate()

//       expect(result.current).toEqual({
//          getPageHeight: expect.anything(),
//          windowWidth: expect.anything(),
//          windowHeight: expect.anything(),
//          pageViewPort: [{
//             "height": 10,
//          }]
//       })
//    });


//    test('Deve tentar obter a altura da pagina', async () => {

//       const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
//          return <ControlsProvider >{children}</ControlsProvider>
//       }
//       const pageHeight=10
//       const pageListArg = {
//          numPages: 1, getPage: jest.fn().mockResolvedValue({
//             getViewport: jest.fn().mockReturnValue({
//                height: pageHeight
//             })
//          })
//       }
//       const { result, waitForNextUpdate } = renderHook(() => usePageList(pageListArg), { wrapper: Wrapper })

//       await waitForNextUpdate()

//       expect(result.current.getPageHeight(0)).toEqual(pageHeight+bottomPageMarginPx)
//    });
// });       

export {}