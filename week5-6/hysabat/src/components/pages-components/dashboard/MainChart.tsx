import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { BanknoteArrowDown, ChartLine, SaudiRiyal, ShoppingCart, Ticket } from 'lucide-react'
import { CartesianGrid, Line, LineChart } from 'recharts'

type StatLineChartProps = {
    icon: React.ReactNode
    title: string
    value: string
    data: { month: string; desktop: number }[]
    config: ChartConfig
}

const StatLineChart = ({ icon, title, value, data, config }: StatLineChartProps) => {
    return (
        <div className="flex items-center justify-center">
            {icon}
            <div className='ml-4'>
                <span className="flex items-center text-xl font-bold"><SaudiRiyal size={16} />{value}</span>
                <h3 className="text-sm">{title}</h3>
            </div>
            <ChartContainer config={config} className='h-14'>
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{ left: 12, right: 12, }}
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
    )
}

const MainChart = () => {

    const chartData = [
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

            <StatLineChart
                icon={<Ticket className="size-8 text-theme1" />}
                title="Sales"
                value="24,000"
                data={chartData}
                config={salesConfig}
            />

            <Separator orientation="vertical" className="h-14! hidden lg:block" />

            <StatLineChart
                icon={<ShoppingCart className="size-8 text-theme1" />}
                title="Purchases"
                value="24,000"
                data={chartData}
                config={purchaseConfig}
            />

            <Separator orientation="vertical" className="h-14! hidden lg:block" />

            <StatLineChart
                icon={<ChartLine className="size-8 text-theme1" />}
                title="Profit"
                value="24,000"
                data={chartData}
                config={profitConfig}
            />

            <Separator orientation="vertical" className="h-14! hidden lg:block" />

            <StatLineChart
                icon={<BanknoteArrowDown className="size-8 text-theme1" />}
                title="Expense"
                value="3000"
                data={chartData}
                config={expenseConfig}
            />

        </div>
    )
}

export default MainChart
