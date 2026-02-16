import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { BanknoteArrowDown, ChartLine, ShoppingCart, Ticket } from 'lucide-react'
import { CartesianGrid, Line, LineChart } from 'recharts'

const MainChart = () => {

    const sales = [
        { month: "January", desktop: 100 },
        { month: "February", desktop: 120 },
        { month: "March", desktop: 150 },
        { month: "April", desktop: 180 },
        { month: "May", desktop: 210 },
        { month: "June", desktop: 240 },
        { month: "July", desktop: 190 },
        { month: "August", desktop: 220 },
        { month: "September", desktop: 200 },
        { month: "October", desktop: 230 },
        { month: "November", desktop: 250 },
        { month: "December", desktop: 280 },
    ]

    const purchase = [
        { month: "January", desktop: 100 },
        { month: "February", desktop: 120 },
        { month: "March", desktop: 150 },
        { month: "April", desktop: 180 },
        { month: "May", desktop: 210 },
        { month: "June", desktop: 240 },
        { month: "July", desktop: 190 },
        { month: "August", desktop: 220 },
        { month: "September", desktop: 200 },
        { month: "October", desktop: 230 },
        { month: "November", desktop: 250 },
        { month: "December", desktop: 280 },
    ]

    const profit = [
        { month: "January", desktop: 100 },
        { month: "February", desktop: 120 },
        { month: "March", desktop: 150 },
        { month: "April", desktop: 180 },
        { month: "May", desktop: 210 },
        { month: "June", desktop: 240 },
        { month: "July", desktop: 190 },
        { month: "August", desktop: 220 },
        { month: "September", desktop: 200 },
        { month: "October", desktop: 230 },
        { month: "November", desktop: 250 },
        { month: "December", desktop: 280 },
    ]

    const expense = [
        { month: "January", desktop: 280 },
        { month: "February", desktop: 250 },
        { month: "March", desktop: 230 },
        { month: "April", desktop: 200 },
        { month: "May", desktop: 190 },
        { month: "June", desktop: 220 },
        { month: "July", desktop: 210 },
        { month: "August", desktop: 180 },
        { month: "September", desktop: 150 },
        { month: "October", desktop: 120 },
        { month: "November", desktop: 100 },
        { month: "December", desktop: 80 },
    ]

    const salesConfig = {
        desktop: {
            label: "Sales",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const purchaseConfig = {
        desktop: {
            label: "Purchase",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const profitConfig = {
        desktop: {
            label: "Profit",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const expenseConfig = {
        desktop: {
            label: "Expense",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig

    return (
        <div className="col-span-1 lg:col-span-3 bg-card rounded-md border p-4 flex flex-wrap gap-4 justify-between">
            <div className="flex items-center gap-4">
                <Ticket className="size-8 text-theme1" />
                <div>
                    <span className="text-xl font-bold">24,000 &#65020;</span>
                    <h3 className="text-sm">Sales</h3>
                </div>
                <ChartContainer config={salesConfig}>
                    <LineChart
                        accessibilityLayer
                        data={sales}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
            <Separator orientation="vertical" className="h-14! hidden lg:block" />
            <div className="flex items-center gap-4">
                <ShoppingCart className="size-8 text-theme1" />
                <div>
                    <span className="text-xl font-bold">24,000 &#65020;</span>
                    <h3 className="text-sm">Purchases</h3>
                </div>
                <ChartContainer config={purchaseConfig}>
                    <LineChart
                        accessibilityLayer
                        data={purchase}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
            <Separator orientation="vertical" className="h-14! hidden lg:block" />
            <div className="flex items-center gap-4">
                <ChartLine className="size-8 text-theme1" />
                <div>
                    <span className="text-xl font-bold">24,000 &#65020;</span>
                    <h3 className="text-sm">Profit</h3>
                </div>
                <ChartContainer config={profitConfig}>
                    <LineChart
                        accessibilityLayer
                        data={profit}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
            <Separator orientation="vertical" className="h-14! hidden lg:block" />
            <div className="flex items-center gap-4">
                <BanknoteArrowDown className="size-8 text-theme1" />
                <div>
                    <span className="text-xl font-bold">3000 &#65020;</span>
                    <h3 className="text-sm">Expense</h3>
                </div>
                <ChartContainer config={expenseConfig}>
                    <LineChart
                        accessibilityLayer
                        data={expense}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default MainChart
