import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const barChartData = [
    { itemType: "electronics", sale: 2750, fill: "var(--color-electronics)" },
    { itemType: "construction", sale: 2000, fill: "var(--color-construction)" },
    { itemType: "consumable", sale: 1870, fill: "var(--color-consumable)" },
    { itemType: "crockery", sale: 1730, fill: "var(--color-crockery)" },
    { itemType: "other", sale: 900, fill: "var(--color-other)" },
]

const barChartConfig = {
    sale: {
        label: "&#65020;",
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

const ProductSales = () => {

    return (
        <div className="col-span-1 lg:col-span-2 gap-4 bg-card rounded-md border p-4">
                <h1 className="text-xl font-extrabold flex items-center gap-2">Product Sales</h1>
                <ChartContainer config={barChartConfig} className="w-full lg:h-64">
                    <BarChart
                        accessibilityLayer
                        barSize={10}
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
                        <XAxis dataKey="sale" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="sale" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
        </div>
    )
}

export default ProductSales