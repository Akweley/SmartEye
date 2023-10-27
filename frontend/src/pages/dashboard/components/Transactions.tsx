import * as React from "react";

import { ChevronDown, Search } from "lucide-react";

import {
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
  createColumnHelper,
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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export type Transactions = Transaction[];

export interface Transaction {
  transactionID: number;
  senderID: string;
  senderAccountNumber: string;
  senderAccountType: string;
  senderRiskFactor: string;
  recipientAccountNumber: string;
  recipientBank: string;
  recipientRiskFactor: string;
  recipientAccountType: string;
  amount: number;
  transactionType: string;
  transactionTime: string;
  isAlertMl: boolean;
}

const columnHelper = createColumnHelper<Transaction>();

const Transactions = ({
  onRowSelect,
  data,
}: {
  onRowSelect: (row: Transaction) => void;
  data: Transaction[];
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [flaggedRows, setFlaggedRows] = React.useState<Transaction[]>([]);

  const handleFlaggedRows = (row: Transaction) => {
    const isExists = flaggedRows.find(
      (r) => r.transactionID === row.transactionID
    );
    if (isExists) {
      console.log("exists");
      const filteredFlaggedRows = flaggedRows.filter(
        (r) => r.transactionID !== row.transactionID
      );
      setFlaggedRows(filteredFlaggedRows);
      return;
    }
    setFlaggedRows([...flaggedRows, row]);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("transactionID", {
        id: "count",
        size: 60,
        sortingFn: (rowA, rowB) => {
          const numA = rowA.index;
          const numB = rowB.index;

          return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        header: "No.",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("transactionID", {
        id: "transactionID",
        header: "Transaction ID",
      }),
      columnHelper.accessor("senderID", {
        id: "senderID",
        header: "Sender ID",
      }),
      columnHelper.accessor("senderAccountType", {
        id: "senderAccountType",
        header: "Sender Account Type",
      }),
      columnHelper.accessor("senderRiskFactor", {
        id: "senderRiskFactor",
        header: "Sender Risk Factor",
        cell: ({
          row: {
            original: { senderRiskFactor },
          },
        }) => (
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-bold",
              senderRiskFactor === "Low" && "bg-green-200 text-green-800",
              senderRiskFactor === "Medium" && "bg-yellow-200 text-yellow-800",
              senderRiskFactor === "High" && "bg-red-200 text-red-800"
            )}
          >
            {senderRiskFactor}
          </span>
        ),
      }),
      columnHelper.accessor("recipientAccountNumber", {
        id: "recipientAccountNumber",
        header: "Recipient Account Number",
      }),
      columnHelper.accessor("recipientBank", {
        id: "recipientBank",
        header: "Recipient Bank",
      }),
      columnHelper.accessor("recipientRiskFactor", {
        id: "recipientRiskFactor",
        header: "Recipient Risk Factor",
        cell: ({
          row: {
            original: { recipientRiskFactor },
          },
        }) => (
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-bold",
              recipientRiskFactor === "Low" && "bg-green-200 text-green-800",
              recipientRiskFactor === "Medium" &&
                "bg-yellow-200 text-yellow-800",
              recipientRiskFactor === "High" && "bg-red-200 text-red-800"
            )}
          >
            {recipientRiskFactor}
          </span>
        ),
      }),
      columnHelper.accessor("recipientAccountType", {
        id: "recipientAccountType",
        header: "Recipient Account Type",
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        header: "Amount",
      }),
      columnHelper.accessor("transactionType", {
        id: "transactionType",
        header: "Transaction Type",
      }),
      columnHelper.accessor("transactionTime", {
        id: "transactionTime",
        header: "Transaction Time",
      }),
      columnHelper.accessor("isAlertMl", {
        id: "isAlertMl",
        header: "Toggle",
        cell: ({ row }) => (
          <Switch
            // defaultChecked={row.original.isAlertMl}
            checked={getFlaggedState(row.original)}
            onCheckedChange={(value) => {
              handleFlaggedRows({
                ...row.original,
                isAlertMl: value,
              });
            }}
          />
        ),
      }),
    ],
    [flaggedRows]
  );

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

  const getFlaggedState = (row: Transaction) => {
    return !!flaggedRows.find((r) => r.transactionID === row.transactionID);
  };

  console.log(flaggedRows);
  return (
    <div className="w-full mt-24 mb-20 text-secondary-foreground">
      <h2 className="text-3xl text-center md:text-left">Transactions</h2>
      <div className="flex flex-col gap-4 md:flex-row items-center py-4">
        <div className="flex gap-2 w-4/5  md:w-1/2 xl:w-1/4 px-1  py-1  border-2  rounded-lg">
          <Input
            placeholder="Search ..."
            value={
              (table.getColumn("transactionID")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("transactionID")
                ?.setFilterValue(event.target.value)
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
                  className={cn(
                    "cursor-pointer",
                    getFlaggedState(row.original) &&
                      "bg-red-200/40 text-red-800"
                  )}
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
