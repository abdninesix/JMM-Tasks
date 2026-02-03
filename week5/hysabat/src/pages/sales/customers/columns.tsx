import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
                    Customer ID
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <Link to={`/customers/${row.original.id}`} className="text-theme1 hover:underline">{row.original.id}</Link>
        ),
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Full Name
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    Credit Limit
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <span className="px-2 rounded-full bg-green-100 dark:bg-green-800">&#65020; {row.original.creditLimit.toLocaleString()}</span>
        )
    },
    {
        accessorKey: "vatNumber",
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
    },
    {
        accessorKey: "invoiceCount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="has-[>svg]:px-0"
                >
                    No. of Invoices
                    <ArrowUpDown className="size-3" />
                </Button>
            )
        },
        cell: ({ getValue }) => (
            <Badge variant="outline">{getValue<number>()}</Badge>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const column = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(column.id)}
                        >
                            <Copy />
                            Copy customer ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Pencil className="text-blue-500" />Edit</DropdownMenuItem>
                        <DropdownMenuItem><Trash2 className="text-destructive" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]