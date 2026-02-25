import MainChart from "@/components/pages-components/dashboard/MainChart"
import Overview from "@/components/pages-components/dashboard/Overview"
// import ExpenseRevenue from "@/components/pages-components/dashboard/ExpenseRevenue"
// import ExpenseShare from "@/components/pages-components/dashboard/ExpenseShare"
// import Inventory from "@/components/pages-components/dashboard/Inventory"
// import ProductSales from "@/components/pages-components/dashboard/ProductSales"
// import TaxInvoicesSummary from "@/components/pages-components/dashboard/TaxInvoicesSummary"
// import TopCustomers from "@/components/pages-components/dashboard/TopCustomers"
// import TopSalesman from "@/components/pages-components/dashboard/TopSalesman"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"

const Dashboard = () => {

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-theme1">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="flex gap-2 text-sm font-semibold text-muted-foreground">
            <Calendar className="size-5" />
            {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())}
          </span>
          <Select defaultValue="d">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value="d">Today</SelectItem>
              <SelectItem value="w">Last Week</SelectItem>
              <SelectItem value="m">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <Separator />

      {/* Content */}
      <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
        <MainChart />
        <Overview />
        {/* <ExpenseShare />
        <TaxInvoicesSummary />
        <Inventory />
        <ExpenseRevenue />
        <ProductSales />
        <TopCustomers />
        <TopSalesman /> */}
      </div>
    </div>
  )
}

export default Dashboard