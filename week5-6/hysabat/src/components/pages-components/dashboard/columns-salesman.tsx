import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SaudiRiyal } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Employee Name
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full size-6 bg-theme1">{row.original.fullName.charAt(0)}</div>
                <span>{row.original.fullName}</span>
            </div>
        ),
    },
    {
        accessorKey: "itemsSold",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Items Sold
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>{row.original.itemsSold.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Total Amount
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.totalAmount.toLocaleString()}</span>
        )
    },
]