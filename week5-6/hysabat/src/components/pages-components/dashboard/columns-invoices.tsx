import type { Invoice } from "@/pages/sales/sales-invoice/columns"
import type { ColumnDef } from "@tanstack/react-table"
import { SaudiRiyal } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "Invoice ID",
        cell: ({ row }) => (
            <Link to={`/sales-invoice/${row.original.id}`} className="text-theme1 hover:underline">
                <span>{row.original.id}</span>
            </Link>
        ),
    },
    {
        accessorKey: "totalItems",
        header: "Total Items",
        cell: ({ row }) => (
            <span>{row.original.totalItems.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "grandTotal",
        header: "Grand Total",
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.grandTotal.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "vatAmount",
        header: "VAT Amount",
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.vatAmount.toLocaleString()}</span>
        )
    },
]