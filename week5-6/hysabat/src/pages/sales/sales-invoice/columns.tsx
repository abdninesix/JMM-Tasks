import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SaudiRiyal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

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
    },
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
            <Link to={`/sales-invoice/${row.original.id}`} className="text-theme1 hover:underline">{row.original.id}</Link>
        ),
    },
    {
        accessorKey: "customerName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Customer Name
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>{row.original.customerName}</span>
        ),
    },
    {
        accessorKey: "invoiceType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Invoice Type
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>{row.original.invoiceType}</span>
        ),
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
            <span className="flex items-center rounded-full"><SaudiRiyal size={15} /> {row.original.grandTotal.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "issueDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    VAT Number
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span>{row.original.issueDate.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => {
            const status = row.original.paymentStatus.toLowerCase();
            let dotColor = "bg-gray-500";
            status === "paid" ? dotColor = "bg-green-500" : status === "partially paid" ? dotColor = "bg-yellow-500" : status === "unpaid" ? dotColor = "bg-red-500" : dotColor = "bg-gray-500"

            return (
                <Badge variant="outline" className={`flex items-center gap-1`}>
                    <div className={`rounded-full size-2 ${dotColor}`} />
                    {row.original.paymentStatus}
                </Badge>
            );
        },
    },
]