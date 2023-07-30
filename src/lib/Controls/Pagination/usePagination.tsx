import { useEffect, useState } from "react";

export const usePagination = ({ pagesCount, page, onChangeValue }: any) => {
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(()=>{
        setCurrentPage(page)
    },[page])

    function previousPage() {
        setCurrentPage((v: number) => {
            const ret = v - 1
            setTimeout(() => {
                if (onChangeValue) onChangeValue(ret)
            }, 0);
            return ret
        })
    }

    function nextPage() {
        setCurrentPage((v: number) => {
            const ret = v + 1

            setTimeout(() => {
                if (onChangeValue) onChangeValue(ret)
            }, 0);
            return ret
        })
    }

    function lastPage() {
        setCurrentPage((_v: number) => {
            const ret = pagesCount-1

            setTimeout(() => {
                if (onChangeValue) onChangeValue(ret)
            }, 0);
            return ret
        })
    }

    function firstPage() {
        setCurrentPage((_v: number) => {
            const ret = 0
            setTimeout(() => {
                if (onChangeValue) onChangeValue(ret)
            }, 0);
            return ret
        })
    }

    return {
        setCurrentPage,
        firstPage,
        lastPage,
        nextPage,
        previousPage,
        currentPage,
        pagesCount,
    }
}