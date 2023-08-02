import { useRef } from "react";

export const useCustomDebounce = () => {
  const timer = useRef<NodeJS.Timeout|undefined>(undefined);

  const myDebounce = (fn: () => void, wait: number) => {
    return ()=>{
      clearTimeout(timer.current);
      // @ts-ignore
      timer.current = setTimeout(() => {
        timer.current=undefined
        fn();
      }, wait);
    }
  };
  return myDebounce;
};

function debounce(func: () => void, wait: number, immediate: boolean) {
  var timeoutId: NodeJS.Timeout|undefined;
  return function() {
    // @ts-ignore
    var context = this, args = arguments;
    var later = function() {
      timeoutId = undefined;
        // @ts-ignore
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
      // @ts-ignore
    if (callNow) func.apply(context, args);
  };
};
