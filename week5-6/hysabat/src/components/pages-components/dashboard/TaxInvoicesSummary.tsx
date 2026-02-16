import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowRightLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Label, Pie, PieChart } from "recharts"

const chartData = [
    { invoice: "cleared", value: 10000, fill: "var(--color-cleared)" },
    { invoice: "uncleared", value: 2782, fill: "var(--color-uncleared)" },
]

const chartConfig = {
    cleared: {
        label: "Cleared",
        color: "var(--chart-0)",
    },
    uncleared: {
        label: "Uncleared",
        color: "var(--chart-01)",
    },
} satisfies ChartConfig

const TaxInvoicesSummary = () => {

    const totalInvoices = chartData[0].value + chartData[1].value

    return (
        <div className="col-span-1 lg:col-span-3 flex flex-col lg:flex-row gap-4 bg-card rounded-md border p-4">
            {/* Tax Invoices */}
            <div className="w-2/3 space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-xl font-extrabold flex items-center gap-2">Tax Invoices<ArrowRightLeft className="p-1 bg-theme1 rounded-md text-white" /></h1>
                    <Link to="/sales-invoice" className="text-theme1 hover:underline">View All</Link>
                </div>
                <div className="flex items-center justify-center h-2/3">Invoice table</div>
            </div>

            <Separator orientation="vertical" className="h-72! hidden lg:block" />

            {/* Summary */}
            <div className="w-1/3 space-y-4">
                <div className="flex justify-between">
                    <h1 className="text-xl font-extrabold">Summary</h1>
                    <Select defaultValue="w">
                        <SelectTrigger className="p-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent position='popper'>
                            <SelectItem value="d">Daily</SelectItem>
                            <SelectItem value="w">Weekly</SelectItem>
                            <SelectItem value="m">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-62"
                >
                    <PieChart>
                        <ChartLegend layout="horizontal" verticalAlign="top" content={<ChartLegendContent />} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="invoice"
                            innerRadius={65}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 14}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalInvoices.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 14}
                                                    className="fill-foreground text-lg"
                                                >
                                                    Total Expense
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default TaxInvoicesSummary