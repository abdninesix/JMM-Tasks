import type { Customer } from "@/pages/sales/customers/columns"
import type { ColumnDef } from "@tanstack/react-table"
import { SaudiRiyal } from "lucide-react"

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.fullName}</span>
            </div>
        ),
    },
    {
        accessorKey: "creditLimit",
        header: "Purchase",
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.creditLimit.toLocaleString()}</span>
        )
    },
]