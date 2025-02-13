import { useDispatch, useSelector } from "react-redux";
import {
  addEmailToNewsletter,
  deleteEmailFormNewsletter,
  deleteManyEmailsFromNewsletter,
  getEmailFromNewsletter,
  updateNewsletter,
} from "@/redux/apiCalls/newsletterApiCalls";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

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
      const { _id, notification } = row.original;
      const dispatch = useDispatch();
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id="notification"
            checked={notification}
            onClick={() => {
              dispatch(updateNewsletter(_id));
            }}
          />
          <Label htmlFor="notification">
            {notification ? "Active" : "Inactive"}
          </Label>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { _id, email } = row.original;
      const dispatch = useDispatch();
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
                You really want to delete this email{" "}
                <span className={"font-medium text-iris"}>{email}</span> from
                your newsletter ?
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
              <AlertDialogAction
                className={"bg-red-600 hover:bg-red-700"}
                onClick={() => {
                  console.log(_id);
                  dispatch(deleteEmailFormNewsletter(_id));
                }}
              >
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
  const { emails, message, error } = useSelector((state) => state.newsletter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getEmailFromNewsletter());
  }, [message]);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({
    _id: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: emails,
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

  const form = useForm();
  const onsubmit = (data) => {
    console.log(data);
    dispatch(addEmailToNewsletter(data));
    setAddOpen(false);
    form.setValue("email", "");
  };
  const [addOpen, setAddOpen] = React.useState(false);

  const { toast } = useToast();
  React.useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error, message]);

  const emailsSelectedIds = Object.keys(rowSelection).map((key) =>
    // table.getRowModel().rows[key].getValue("_id")
    table
      .getRowModel()
      .rows.filter((item) => item.id === key)[0]
      .getValue("_id")
  );

  const emailsSelected = Object.keys(rowSelection).map((key) =>
    // table.getRowModel().rows[key].getValue("email")
    table
      .getRowModel()
      .rows.filter((item) => item.id === key)[0]
      .getValue("email")
  );

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
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setAddOpen(true);
                  }}
                >
                  Add One
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] gap-1">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="grid gap-4 py-4">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required:
                            "Email is required to added in newsletter !",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Enter a valid email !",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-4">
                            <FormLabel className="text-right main-label">
                              Email
                            </FormLabel>
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  placeholder="Enter email address"
                                  className={"mb-1 main-input"}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage>
                                {form.formState.errors.emails?.message}
                              </FormMessage>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
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
                    You really want to delete the following emails :{" "}
                    <ul className={"list-disc ml-8 mt-2"}>
                      {emailsSelected.map((email) => (
                        <li className={"font-medium text-iris"}>{email}</li>
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
                      dispatch(deleteManyEmailsFromNewsletter(emailsSelectedIds));
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
                <Button variant="outline" className="ml-auto bg-white">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={"bg-white"}>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide() && column.id !== '_id')
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
                table.getRowModel().rows?.map((row) => (
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
