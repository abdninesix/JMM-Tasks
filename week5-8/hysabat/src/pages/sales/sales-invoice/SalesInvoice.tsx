import React from "react"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dummyInvoices } from "@/lib/data"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState, type SortingState } from "@tanstack/react-table"
import { Plus, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { columns } from "./columns"

const SalesInvoice = () => {

  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: dummyInvoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: { rowSelection, globalFilter, sorting, columnFilters },
    initialState: { pagination: { pageSize: 8 } },
  })

  const navigate = useNavigate();

  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb items={[{ label: "Sales" }, { label: "Sales Invoice" }]} />
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-semibold text-theme1">Sales Invoice</h1>
          <Button onClick={() => navigate("/sales-invoice/create")} className='text-white bg-theme1 hover:bg-theme1/90'>
            <Plus />Create Invoice <Kbd className="bg-transparent text-white border border-white">Ctrl+Alt+I</Kbd>
          </Button>
        </div>
      </header>

      <Separator />

      <div className="rounded-md border">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Total Invoices</span>
            <Badge variant="outline">{dummyInvoices.length}</Badge>
          </div>
          <InputGroup className="max-w-3xs">
            <InputGroupInput
              placeholder="Search invoices"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <InputGroupAddon><Search /></InputGroupAddon>
          </InputGroup>
        </div>
        {/* Table Section */}
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
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
  )
}

export default SalesInvoice