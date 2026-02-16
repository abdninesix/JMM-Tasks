import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"

const chartData = [
    { expense: "purchases", value: 10000, fill: "var(--color-purchases)" },
    { expense: "others", value: 2782, fill: "var(--color-others)" },
]

const chartConfig = {
    purchases: {
        label: "Purchases",
        color: "var(--chart-0)",
    },
    others: {
        label: "Others",
        color: "var(--chart-01)",
    },
} satisfies ChartConfig

const ExpenseShare = () => {

    const totalExpense = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    return (
        <div className="col-span-1 bg-card rounded-md border p-4 space-y-4">
            <h1 className="text-xl font-extrabold">Expense Share</h1>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-62.5"
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
                        nameKey="expense"
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
                                                {totalExpense.toLocaleString()}
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
    )
}

export default ExpenseShare