import * as React from "react";

import { ChevronDown, Link, Search } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  // createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export interface Student {
  file: File | null;
  hash: string | undefined;
  programme: string;
  name: string;
  studentID: string;
  yearOfCompletion: string;
}

const columns: ColumnDef<Student>[] = [
  {
    header: "ID",
    accessorKey: "studentID",
    cell: ({ row }) => (
      <div className="text-left">{Number(row.getValue("studentID"))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "programme",
    header: "Programme",
    cell: ({ row }) => <div className="">{row.getValue("programme")}</div>,
  },
  {
    accessorKey: "yearOfCompletion",
    header: () => "Year of Completion",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("yearOfCompletion")}</div>
    ),
  },
  {
    accessorKey: "hash",
    header: () => "Transcript",
    cell: ({}) => (
      <div className="flex justify-center">
        <Link size="16" className="mr-2 text-primary" />
      </div>
    ),
  },
];

const Transactions = ({
  onRowSelect,
  data,
}: {
  onRowSelect: (row: Student) => void;
  data: Student[];
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data,
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
    <div className="w-full mt-24 mb-20 text-secondary-foreground">
      <h2 className="text-3xl text-center md:text-left">Transactions</h2>
      <div className="flex flex-col gap-4 md:flex-row items-center py-4">
        <div className="flex gap-2 w-4/5  md:w-1/2 xl:w-1/4 px-1  py-1  border-2  rounded-lg">
          <Input
            placeholder="Search ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="border-none px-1 active:border-none max-w-sm"
          />
          <div className="bg-primary px-3 rounded-lg flex items-center drop-shadow-2xl ">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
      <div className="rounded-md border">
        <Table>
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
                  className="cursor-pointer"
                  onClick={() => onRowSelect(row.original)}
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
      <div className="flex items-center justify-between md:justify-end space-x-2 py-4">
        <div className="flex flex-col md:flex-row self-start space-y-2 md:self-center md:space-y-0 md:space-x-2">
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

        <Select
          onValueChange={(value: string | number) => {
            table.setPageSize(+value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`${1}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[25, 50, 100].map((item) => (
                <SelectItem key={item} value={item.toString()}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Transactions;
