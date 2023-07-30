import React from "react"
import { FC } from "react"

type TDownloadControl = {
    src: string
    as?: React.ElementType
}

const DownloadControl: FC<TDownloadControl> = ({children, src, as: asProp, ...restProps }) => {

    const extraButtonProps = asProp == "a" ? { targe: "_blank", download: true } : {}

    const defaultButtonProps = {
        ...restProps,
        ...extraButtonProps
    }

    return React.createElement(asProp!, { ...defaultButtonProps }, children)
}

DownloadControl.defaultProps = {
    as: "a"
}

export { DownloadControl }
