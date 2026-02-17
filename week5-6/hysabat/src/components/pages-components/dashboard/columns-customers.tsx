import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SaudiRiyal } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Name
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.fullName}</span>
                <span className="text-muted-foreground">{row.original.fullNameAr}</span>
            </div>
        ),
    },
    {
        accessorKey: "creditLimit",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Purchase
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span className="flex items-center"><SaudiRiyal size={15} /> {row.original.creditLimit.toLocaleString()}</span>
        )
    },
]