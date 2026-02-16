import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const ExpenseRevenue = () => {

    const chartData = [
        { month: "January", expense: 1860, revenue: 800 },
        { month: "February", expense: 3050, revenue: 2000 },
        { month: "March", expense: 2370, revenue: 1200 },
        { month: "April", expense: 730, revenue: 1900 },
        { month: "May", expense: 2090, revenue: 1300 },
        { month: "June", expense: 2140, revenue: 1400 },
    ]
    const chartConfig = {
        expense: {
            label: "Expense",
            color: "var(--chart-0)",
        },
        revenue: {
            label: "Revenue",
            color: "var(--chart-01)",
        },
    } satisfies ChartConfig

    return (
        <div className="col-span-1 bg-card rounded-md border p-4 space-y-4">
            <h1 className="text-xl font-extrabold">Expense/Revenue</h1>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} barGap={0}>
                    <ChartLegend layout="horizontal" verticalAlign="top" content={<ChartLegendContent />} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        dataKey="expense"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={true}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar dataKey="expense" fill="var(--color-expense)" barSize={10} radius={4} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" barSize={10} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default ExpenseRevenue