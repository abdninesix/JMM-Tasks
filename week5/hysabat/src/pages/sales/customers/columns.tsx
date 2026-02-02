import type { ColumnDef } from "@tanstack/react-table"
import { Pen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export type Customer = {
    id: string
    fullName: string
    fullNameAr: string
    phone: string
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
    {
        accessorKey: "id",
        header: "Customer ID",
        cell: ({ row }) => (
            <Link to="#" className="text-theme1 hover:underline">{row.original.id}</Link>
        ),
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.fullName}</span>
                <span className="text-muted-foreground">{row.original.fullNameAr}</span>
            </div>
        ),
    },
    {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.phone}</span>
                <span className="text-muted-foreground">{row.original.contact}</span>
            </div>
        ),
    },
    {
        accessorKey: "creditLimit",
        header: "Credit Limit",
        cell: ({ row }) => (
            <span className="px-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">{row.original.creditLimit.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "vatNumber",
        header: "VAT Number"
    },
    {
        accessorKey: "invoiceCount",
        header: "No. of Invoices",
        cell: ({ getValue }) => (
            <Badge variant="outline">{getValue<number>()}</Badge>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <>
                <Button variant="ghost" size="icon" ><Pen /></Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 /></Button>
            </>
        ),
    },
]

export const dummyCustomers: Customer[] = Array.from({ length: 25 }, (_, i) => ({
    id: `CUS-00${i + 1}`,
    fullName: ["John Doe", "Sarah Smith", "TechCorp", "Jane Roe"][i % 4],
    fullNameAr: ["جون دو", "سارة سميث", "تيك كوورب", "جين رو"][i % 4],
    phone: `+44-555-010${i + 1000}`,
    contact: `contact${i}@example.com`,
    creditLimit: 5000 + (i * 100),
    vatNumber: `VAT${10000 + i}`,
    invoiceCount: i + 2,
}));