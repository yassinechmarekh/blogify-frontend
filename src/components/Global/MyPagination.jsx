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

function MyPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={'pagination-item'}>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem className={'bg-white rounded-lg'}>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={'pagination-item'}>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem className={'pagination-item'}>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem className={'pagination-item'}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className={'pagination-item'}>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MyPagination;
