import type { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Customer = {
  id: string
  fullName: string
  contact: string
  creditLimit: number
  vatNumber: string
  invoiceCount: number
}

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    enableSorting: true,
    enableHiding: false,
  },
  { accessorKey: "id", header: "Customer ID" },
  { accessorKey: "fullName", header: "Full Name" },
  { accessorKey: "contact", header: "Contact" },
  {
    accessorKey: "creditLimit",
    header: "Credit Limit",
    cell: ({ row }) => `$${row.original.creditLimit.toLocaleString()}`,
  },
  { accessorKey: "vatNumber", header: "VAT Number" },
  { accessorKey: "invoiceCount", header: "No. of Invoices" },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" ><Pen className="size-4" /></Button>
        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="size-4" /></Button>
      </div>
    ),
  },
]

export const dummyCustomers: Customer[] = Array.from({ length: 25 }, (_, i) => ({
  id: `CUS-00${i + 1}`,
  fullName: ["John Doe", "Sarah Smith", "TechCorp", "Jane Roe"][i % 4],
  contact: `contact${i}@example.com`,
  creditLimit: 5000 + (i * 100),
  vatNumber: `VAT${10000 + i}`,
  invoiceCount: i + 2,
}));