import type { ColumnDef } from "@tanstack/react-table"
import { SaudiRiyal } from "lucide-react"

export type Salesman = {
    id: string
    fullName: string
    fullNameAr: string
    phone: string
    email: string
    itemsSold: number
    totalAmount: number
}

export const columns: ColumnDef<Salesman>[] = [
    {
        accessorKey: "fullName",
        header: "Employee Name",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full size-6 bg-theme1 text-white">{row.original.fullName.charAt(0)}</div>
                <span>{row.original.fullName}</span>
            </div>
        ),
    },
    {
        accessorKey: "itemsSold",
        header: "Items Sold",
        cell: ({ row }) => (
            <span>{row.original.itemsSold.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.totalAmount.toLocaleString()}</span>
        )
    },
]