import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Bar, BarChart, Label, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts"

const barChartData = [
    { itemType: "electronics", sold: 275, fill: "var(--color-electronics)" },
    { itemType: "construction", sold: 200, fill: "var(--color-construction)" },
    { itemType: "consumable", sold: 187, fill: "var(--color-consumable)" },
    { itemType: "crockery", sold: 173, fill: "var(--color-crockery)" },
    { itemType: "other", sold: 90, fill: "var(--color-other)" },
]

const pieChartData = [
    { items: "available", value: 10000, fill: "var(--color-available)" },
    { items: "outOfStock", value: 2782, fill: "var(--color-outOfStock)" },
]

const barChartConfig = {
    sold: {
        label: "Sold Items",
    },
    electronics: {
        label: "Electronics",
        color: "var(--chart-0)",
    },
    construction: {
        label: "Construction",
        color: "var(--chart-0)",
    },
    consumable: {
        label: "Consumable",
        color: "var(--chart-0)",
    },
    crockery: {
        label: "Crockery",
        color: "var(--chart-0)",
    },
    other: {
        label: "Other",
        color: "var(--chart-0)",
    },
} satisfies ChartConfig

const pieChartConfig = {
    available: {
        label: "Available",
        color: "var(--chart-0)",
    },
    outOfStock: {
        label: "Out of Stock",
        color: "var(--chart-01)",
    },
} satisfies ChartConfig

const Inventory = () => {

    const totalInventory = pieChartData[0].value + pieChartData[1].value

    return (
        <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-row gap-4 bg-card rounded-md border p-4">
            {/* Inventory */}
            <div className="w-full lg:w-2/3">
                <h1 className="text-xl font-extrabold flex items-center gap-2">Inventory</h1>
                <ChartContainer config={barChartConfig} className="w-full lg:h-64">
                    <BarChart
                        accessibilityLayer
                        barSize={6}
                        data={barChartData}
                        layout="vertical"
                        margin={{
                            left: 35,
                        }}
                    >
                        <YAxis
                            dataKey="itemType"
                            type="category"
                            tickLine={false}
                            tickMargin={85}
                            axisLine={false}
                            tick={{ fontSize: 16, textAnchor: "start" }}
                            tickFormatter={(value) =>
                                barChartConfig[value as keyof typeof barChartConfig]?.label
                            }
                        />
                        <XAxis dataKey="sold" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="sold" layout="vertical" radius={5} >
                            <LabelList
                                dataKey="sold"
                                position="top"
                                formatter={(v: number) => `${v} Sold Items`}
                                style={{ fill: "var(--foreground)", fontSize: 14, fontWeight: 600 }}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>

            <Separator orientation="vertical" className="h-72! hidden lg:block" />
            <Separator orientation="horizontal" className=" lg:hidden" />

            {/* Pie Chart */}
            <div className="lg:w-1/3 flex items-center">
                <ChartContainer
                    config={pieChartConfig}
                    className="mx-auto aspect-square size-full max-h-62"
                >
                    <PieChart>
                        <ChartLegend layout="horizontal" verticalAlign="top" content={<ChartLegendContent />} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="items"
                            innerRadius={70}
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
                                                    {totalInventory.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 14}
                                                    className="fill-foreground text-lg"
                                                >
                                                    Total Items
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

export default Inventory