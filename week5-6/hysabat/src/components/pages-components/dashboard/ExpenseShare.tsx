import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

const chartData = [
    {
        purchases: 10000,
        others: 2782,
    },
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

    const totalExpense = chartData[0].purchases + chartData[0].others

    return (
        <div className="w-full lg:w-1/3 bg-card rounded-md border p-4 space-y-4">
            <h1 className="text-xl font-extrabold">Expense Share</h1>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full max-w-62"
            >
                <RadialBarChart
                    data={chartData}
                    endAngle={360}
                    innerRadius={80}
                    outerRadius={130}
                >
                    <ChartLegend
                        verticalAlign="top"
                        layout="horizontal"
                        payload={[
                            { value: "Purchases", type: "circle", color: "var(--chart-0)", dataKey: "purchases" },
                            { value: "Others", type: "circle", color: "var(--chart-01)", dataKey: "others" },
                        ]}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) - 10}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {totalExpense.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 10}
                                                className="text-base fill-foreground"
                                            >
                                                Total Expense
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                    <RadialBar
                        dataKey="purchases"
                        stackId="a"
                        cornerRadius={0}
                        fill="var(--chart-0)"
                        className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                        dataKey="others"
                        fill="var(--chart-01)"
                        stackId="a"
                        cornerRadius={0}
                        className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
        </div>
    )
}

export default ExpenseShare