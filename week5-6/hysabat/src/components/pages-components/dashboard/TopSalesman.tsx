import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dummySalesmen } from "@/lib/data"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "./columns-salesman"

const TopSalesman = () => {

    const topSalesman = [...dummySalesmen]
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 5)

    const table = useReactTable({
        data: topSalesman,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="col-span-1 lg:col-span-2 bg-card rounded-md border p-4 space-y-4">
            <h1 className="text-xl font-extrabold">Top 5 Salesman</h1>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TopSalesman