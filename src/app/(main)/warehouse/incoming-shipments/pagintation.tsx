"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type Props = {
  table: any;
};

export function PaginationComponent({ table }: Props) {
  const totalPages = table.getPageCount();
  // const actualPage = table.getState().pagination.pageIndex + 1;
  console.log(totalPages);

  const [actualPage, setActualPage] = useState(
    table.getState().pagination.pageIndex + 1
  );
  console.log(actualPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              table.previousPage();
              actualPage > 1 && setActualPage(actualPage - 1);
            }}
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            // isActive={table.getState().pagination.pageIndex + 1 === actualPage}
          >
            {actualPage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={table.getState().pagination.pageIndex + 1 === actualPage}
          >
            {actualPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            // isActive={table.getState().pagination.pageIndex + 1 === actualPage}
          >
            {actualPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => {
              table.nextPage();
              actualPage < totalPages && setActualPage(actualPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
