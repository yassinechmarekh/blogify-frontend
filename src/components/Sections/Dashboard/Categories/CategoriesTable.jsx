import * as React from "react";
import { Link } from "react-router-dom";

// Components
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Icons
import { FaTrashAlt } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import EditCategory from "./EditCategory";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  deleteManyCategories,
} from "@/redux/apiCalls/categoryApiCalls";

const columns = [
  {
    accessorKey: "_id",
    header: "ID",
    enableHiding: true,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const { slug } = row.original;
      return (
        <Link to={`/categories/${slug}`}>
          <img
            className="w-12 h-12 rounded-xl"
            src={row.getValue("image")}
            alt={row.getValue("title")}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { slug } = row.original;
      return (
        <Link
          to={`/categories/${slug}`}
          className="hover:text-iris hover:underline my-transition capitalize"
        >
          {row.getValue("title")}
        </Link>
      );
    },
  },
  {
    accessorKey: "posts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posts
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <MdArticle size={20} /> {row.getValue("posts")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);
      const category = row.original;
      const dispatch = useDispatch();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"bg-white"}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/categories/${category.slug}`}>
                <DropdownMenuItem>View Category</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  setOpenEdit(true);
                }}
              >
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className={"text-space-cadet"}>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You really want to delete this category :{" "}
                  <span className={"capitalize text-iris font-semibold"}>
                    {row.getValue("title")}
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={
                    "bg-iris text-white hover:bg-tropical-indigo hover:text-white"
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={"bg-red-600 hover:bg-red-700"}
                  onClick={() => {
                    dispatch(deleteCategory(category._id));
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <EditCategory
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            category={category}
          />
        </>
      );
    },
  },
];

function CategoriesTable({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({
    _id: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const categoriesSelectedIds = Object.keys(rowSelection).map((key) =>
    table.getRowModel().rows[key].getValue("_id")
  );

  const categoriesSelectedTiltles = Object.keys(rowSelection).map((key) =>
    table.getRowModel().rows[key].getValue("title")
  );

  const dispatch = useDispatch();

  return (
    <div className="w-full text-space-cadet">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
        <Input
          placeholder="Filter titles..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm main-input bg-white"
        />
        <div className={"flex gap-4"}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <FaTrashAlt size={14} /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className={"text-space-cadet"}>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You really want to delete the following categories :{" "}
                  <ul className={"list-disc ml-8 mt-2"}>
                    {categoriesSelectedTiltles.map((title) => (
                      <li className={"capitalize font-medium text-iris"}>
                        {title}
                      </li>
                    ))}
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={
                    "bg-iris text-white hover:bg-tropical-indigo hover:text-white"
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={"bg-red-600 hover:bg-red-700"}
                  onClick={() => {
                    dispatch(deleteManyCategories(categoriesSelectedIds));
                    setRowSelection([]);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-white hover:text-space-cadet"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"bg-white"}>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className={"bg-white"}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={"bg-white text-space-cadet hover:text-iris"}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={"bg-white text-space-cadet hover:text-iris"}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesTable;
