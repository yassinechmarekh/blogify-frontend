import * as React from "react";
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
import { FaTrashAlt } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const data = [
  {
    id: "m5gr84i9",
    email: "ken99@yahoo.com",
    notification: true,
  },
  {
    id: "m5gr84i9",
    email: "Abe45@gmail.com",
    notification: true,
  },
  {
    id: "m5gr84i9",
    email: "Monserrat44@gmail.com",
    notification: true,
  },
  {
    id: "m5gr84i9",
    email: "Silas22@gmail.com",
    notification: false,
  },
  {
    id: "m5gr84i9",
    email: "ken99@yahoo.com",
    notification: false,
  },
  {
    id: "m5gr84i9",
    email: "Silas22@gmail.com",
    notification: false,
  },
  {
    id: "m5gr84i9",
    email: "ken99@yahoo.com",
    notification: true,
  },
  {
    id: "m5gr84i9",
    email: "Monserrat44@gmail.com",
    notification: true,
  },
  {
    id: "m5gr84i9",
    email: "ken99@yahoo.com",
    notification: false,
  },
  {
    id: "m5gr84i9",
    email: "Silas22@gmail.com",
    notification: true,
  },
];

const columns = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "notification",
    header: () => <div className="">Notification</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Switch id="notification" checked={row.getValue("notification")} />
          <Label htmlFor="notification">{row.getValue('notification') ? 'Active' : 'Inactive'}</Label>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <AlertDialog>
          <AlertDialogTrigger
            className={"p-2 bg-red-600 hover:bg-red-700 text-white rounded-md"}
          >
            <FaTrashAlt size={14} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className={"text-space-cadet"}>
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className={
                  "bg-iris hover:bg-tropical-indigo text-white hover:text-white"
                }
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className={"bg-red-600 hover:bg-red-700"}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

function Newsletter() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
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

  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Newsletter</h1>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
          <Input
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white main-input"
          />
          <div className="flex gap-4">
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
                    {JSON.stringify(rowSelection)}
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
                  <AlertDialogAction className={"bg-red-600 hover:bg-red-700"}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto bg-white">
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
        <div className="rounded-md border overflow-hidden">
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
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
