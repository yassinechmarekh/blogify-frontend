import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function MyPagination({ currentPage, setCurrentPage, total, pageNumber }) {
  let pages = [];
  const totalPages = Math.ceil(total / pageNumber);
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={
            currentPage === 1
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "cursor-pointer"
          }
        >
          <PaginationPrevious
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        {totalPages > 3 && currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={`${
              page === currentPage
                ? "bg-white text-iris rounded-lg"
                : "cursor-pointer"
            } 
               ${
                 totalPages > 3 &&
                 !(
                   page === currentPage ||
                   page === currentPage - 1 ||
                   page === currentPage + 1
                 )
                   ? "hidden"
                   : ""
               }`}
          >
            <PaginationLink
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 &&
          currentPage !== totalPages - 1 &&
          currentPage !== totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        <PaginationItem
          className={
            currentPage === totalPages
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "cursor-pointer"
          }
        >
          <PaginationNext
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MyPagination;
