import { useSearchParams, useLocation } from "react-router-dom";
import { itemsPerPage } from "src/utils/constants";
import PageButton from "../common/PageButton";

const Pagination = ({ numberOfItems }: { numberOfItems: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(numberOfItems / itemsPerPage);

  const nextPage = () => {
    if (pathname === "/bookings" && currentPage < totalPages) {
      searchParams.set("page", String(currentPage + 1));
      setSearchParams(searchParams);
    }
  };

  const previousPage = () => {
    if (pathname === "/bookings" && currentPage <= totalPages) {
      console.log("uslo");
      searchParams.set("page", String(currentPage - 1));
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex gap-4">
      <PageButton
        isDisabled={currentPage === 1 ? true : false}
        direction="previous"
        clickHandler={previousPage}
      />
      <PageButton
        isDisabled={currentPage > numberOfItems / itemsPerPage ? true : false}
        direction="next"
        clickHandler={nextPage}
      />
    </div>
  );
};

export default Pagination;
