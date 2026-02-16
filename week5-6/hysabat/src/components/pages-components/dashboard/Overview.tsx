import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const Overview = () => {

    const chartData = [
        { month: "January", desktop: 186, expense: 800 },
        { month: "February", desktop: 305, expense: 750 },
        { month: "March", desktop: 237, expense: 1000 },
        { month: "April", desktop: 73, expense: 680 },
        { month: "May", desktop: 209, expense: 1100 },
        { month: "June", desktop: 214, expense: 950 },
        { month: "July", desktop: 0, expense: 1100 },
        { month: "August", desktop: 0, expense: 1150 },
        { month: "September", desktop: 0, expense: 1150 },
        { month: "October", desktop: 0, expense: 1000 },
        { month: "November", desktop: 0, expense: 820 },
        { month: "December", desktop: 0, expense: 1200 },
    ]
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "var(--chart-0)",
        },
    } satisfies ChartConfig

    return (
        <div className="w-full lg:w-2/3 bg-card rounded-md border p-4 space-y-4">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <h1 className="text-xl font-extrabold">Overview</h1>
                    <p className="flex items-center text-sm"><ChevronUp className="text-theme1" />10% inc from last Month</p>
                </div>
                <Select defaultValue="d">
                    <SelectTrigger className="p-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position='popper'>
                        <SelectItem value="d">Today</SelectItem>
                        <SelectItem value="w">Last Week</SelectItem>
                        <SelectItem value="m">Last Month</SelectItem>
                    </SelectContent>
                </Select>
            </header>

            <ChartContainer config={chartConfig} className="w-full h-72">
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        dataKey="expense"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" hideLabel />}
                    />
                    <Area
                        dataKey="expense"
                        type="linear"
                        fill="var(--color-desktop)"
                        fillOpacity={0.2}
                        stroke="var(--color-desktop)"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

export default Overview