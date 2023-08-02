import { act, renderHook } from "@testing-library/react-hooks";
import { useCustomDebounce } from "..";

describe('Name of the group', () => {
    test('should ', () => {
        
        jest.useFakeTimers()

        const callback=jest.fn()

        const {result}=renderHook(()=>useCustomDebounce())

        act(()=>{
           const laterCall= result.current(callback,1000)
           laterCall()
           laterCall()
           laterCall()
           laterCall()                   
        })
       
        jest.runAllTimers()

        expect(callback).toHaveBeenCalledTimes(1)        
    });
});