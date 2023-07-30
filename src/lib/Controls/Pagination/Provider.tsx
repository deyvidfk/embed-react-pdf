import { createContext, PropsWithChildren, useState, useCallback, useMemo } from "react"
import { TPaginationContext } from "../../types"

const PaginationContext = createContext<TPaginationContext | null>(null)

export type TDocumentPaginationProvider = {
    total: number
    page:number
}

export const DocumentPaginationProvider: React.FC<PropsWithChildren<TDocumentPaginationProvider>> = ({ total,page, children }) => {

    const [currentPage, setCurrentPage] = useState(page)

    const toGo = useCallback((value: number) => {
        setCurrentPage(value)
    }, [])


    const va = useMemo(() => {
        return {
            toGo,
            total,
            page:currentPage
        }
    }, [])

    return <PaginationContext.Provider value={{ ...va }}>
        {children}
    </PaginationContext.Provider>
}



