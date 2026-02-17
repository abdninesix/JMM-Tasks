import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SaudiRiyal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Invoice = {
    id: string
    customerName: string
    invoiceType: string
    totalItems: number
    grandTotal: number
    vatAmount: number
    issueDate: string
    paymentStatus: string
}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Invoice ID
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.id}</span>
            </div>
        ),
    },
    {
        accessorKey: "totalItems",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Total Items
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>{row.original.totalItems.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "grandTotal",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Grand Total
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.grandTotal.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "vatAmount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    VAT Amount
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.vatAmount.toLocaleString()}</span>
        )
    },
]