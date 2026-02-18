import React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Badge } from "@/components/ui/badge"
import { CloudUpload, Loader2Icon, Plus, Search } from "lucide-react"
import { columns } from "./columns"
import { dummyCustomers } from "@/lib/data"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

type Location = {
  id: string
  name: string
  description: string
  photo: string
}

type LocationsQueryData = {
  locations: Location[]
}

const Customers = () => {
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const { loading, error, data } = useQuery<LocationsQueryData>(GET_LOCATIONS);

  const table = useReactTable({
    data: dummyCustomers,
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

  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb items={[{ label: "Sales" }, { label: "Customers" }]} />
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <h1 className="text-2xl font-semibold text-theme1">Customers</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline"><CloudUpload />Bulk Import</Button>
            <Button className='text-white bg-theme1 hover:bg-theme1/90'>
              <Plus />Add Customer <Kbd className="bg-transparent text-white border border-white">Ctrl+Shift+C</Kbd>
            </Button>
          </div>
        </div>
      </header>

      <Separator />

      <div className="rounded-md border">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Total Customers</span>
            <Badge variant="outline">{dummyCustomers.length}</Badge>
          </div>
          <InputGroup className="max-w-3xs">
            <InputGroupInput
              placeholder="Search customers"
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

      <div>
        {loading ? <Loader2Icon className="animate-spin" /> : error ? <p>{error.message}</p> : (
          <ul className="grid grid-cols-2 gap-4">
            {data?.locations.map((location) => (
              <li key={location.id} className="bg-accent rounded-md p-4 space-y-2">
                <h1 className="text-2xl font-semibold">{location.name}</h1>
                <img src={location.photo} alt={location.name} className="w-full rounded-md" />
                <p>{location.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default Customers