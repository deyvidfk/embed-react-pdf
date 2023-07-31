import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useControls } from "../useControls";
import { usePagination } from "../../utils/usePagination";

type TPaginationControl = {
  onChange?: ({ page, count }: { page: number; count: number }) => void;
  disabled?: boolean;
};
function PaginationControl({ onChange }: TPaginationControl) {
  const { pagination } = useControls();

  const {
    setCurrentPage,
    firstPage,
    lastPage,
    nextPage,
    previousPage,
    pagesCount,
    currentPage,
  } = usePagination({
    pagesCount: pagination.total.value,
    page: pagination.page.value,
  });

  useEffect(() => {
    setCurrentPage(pagination.page.value);

    if (onChange)
      onChange({ page: pagination.page.value, count: pagination.total.value });
  }, [pagination.page.value]);

  useEffect(() => {
    pagination.page.set(currentPage);
  }, [currentPage]);

  const handleKeyPress = (event: any) => {
    console.log("Enter");
    if (event.key === "Enter") {
      const nv = Number(event.currentTarget.value);
      if (nv <= pagesCount) {
        setCurrentPage(nv);
      } else {
        setCurrentPage(pagesCount);
      }
    }
  };

  const handleBlurPress = (event: any) => {
    const nv = Number(event.currentTarget.value);
    if (nv <= pagesCount && event.currentTarget.value != currentPage) {
      setCurrentPage(nv);
    } else {
      setCurrentPage(pagesCount);
    }
  };

  const handleInputChange = (event: any) => {
    const nv = Number(event.currentTarget.value);

    if (nv <= pagesCount) {
      setCurrentPage(nv);
    }
  };

  return (
    <>
      <button type="button" disabled={currentPage <= 1} onClick={firstPage}>
        {"<<"}
      </button>

      <button type="button" disabled={currentPage <= 1} onClick={previousPage}>
        {"<"}
      </button>

      <button
        type="button"
        disabled={currentPage >= pagesCount}
        onClick={nextPage}
      >
        {">"}
      </button>

      <button
        type="button"
        disabled={currentPage >= pagesCount}
        onClick={lastPage}
      >
        {">>"}
      </button>
    </>
  );
}

type TPageInputControl = {
  onChange?: ({ page, count }: { page: number; count: number }) => void;
  inputAs?: React.ElementType;
  slots: {
    labelLeft: ReactNode;
    labelRight: ReactNode;
  };
};

const PageInputControl: FC<TPageInputControl> = ({
  slots,
  onChange,
  inputAs,
}) => {
  const inputRef = useRef();

  const { pagination } = useControls();

  const { setCurrentPage, pagesCount, currentPage } = usePagination({
    pagesCount: pagination.total.value,
    page: pagination.page.value,
  });

  useEffect(() => {
    setCurrentPage(pagination.page.value);

    if (onChange)
      onChange({ page: pagination.page.value, count: pagination.total.value });
  }, [pagination.page.value]);

  useEffect(() => {
    pagination.page.set(currentPage);
  }, [currentPage]);

  const handleKeyPress = (event: any) => {
    console.log("Enter");
    if (event.key == "Enter") {
      const nv = Number(event.currentTarget.value);
      if (nv <= pagesCount) {
        setCurrentPage(nv);
      } else {
        setCurrentPage(pagesCount);
      }
    }
  };

  const handleBlurPress = (event: any) => {
    const nv = Number(event.currentTarget.value);
    if (nv <= pagesCount && event.currentTarget.value != currentPage) {
      setCurrentPage(nv);
    } else {
      setCurrentPage(pagesCount);
    }
  };

  const extraButtonProps =
    inputAs == "input"
      ? {
          type: "number",
          defaultValue: { currentPage },
          ref: inputRef as any,
          max: pagesCount - 1,
          min: 0,
        }
      : {};

  const defaultButtonProps = {
    className: "mrc-embed-pdf__control-input",
    onKeyPress: handleKeyPress,
    onBlur: handleBlurPress,
    ...extraButtonProps,
  };

  return (
    <div>
      <span>{slots.labelLeft} </span>
      {React.createElement(inputAs!, { ...defaultButtonProps })}
      <span> {slots.labelRight} </span>
      <span>{pagesCount}</span>
    </div>
  );
};

PageInputControl.defaultProps = {
  inputAs: "input",
};
export { PageInputControl, PaginationControl };
