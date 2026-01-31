import { Box, ChartColumnIncreasing, CirclePercent, Coins, Landmark, NotepadText, Settings, ShoppingBag, ShoppingCart, Truck, Users } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: CirclePercent,
    children: [
      { title: "Orders", url: "/sales/orders" },
      { title: "Invoices", url: "/sales/invoices" },
      { title: "Customers", url: "/sales/customers" },
    ],
  },
  {
    title: "Purchases",
    url: "/purchases",
    icon: ShoppingCart,
    children: [
      { title: "Suppliers", url: "/purchases/suppliers" },
      { title: "Bills", url: "/purchases/bills" },
      { title: "Purchase Orders", url: "/purchases/orders" },
    ],
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Box,
    children: [
      { title: "Products", url: "/inventory/products" },
      { title: "Stock Levels", url: "/inventory/stock" },
      { title: "Warehouses", url: "/inventory/warehouses" },
    ],
  },
  {
    title: "Delivery",
    url: "/delivery",
    icon: Truck,
    children: [
      { title: "Shipments", url: "/delivery/shipments" },
      { title: "Routes", url: "/delivery/routes" },
      { title: "Tracking", url: "/delivery/tracking" },
    ],
  },
  {
    title: "POS",
    url: "/pos",
    icon: ShoppingBag,
    children: [
      { title: "New Sale", url: "/pos/new" },
      { title: "Sessions", url: "/pos/sessions" },
      { title: "Receipts", url: "/pos/receipts" },
    ],
  },
  {
    title: "Finance",
    url: "/finance",
    icon: Landmark,
    children: [
      { title: "Cash Flow", url: "/finance/cash-flow" },
      { title: "Expenses", url: "/finance/expenses" },
      { title: "Taxes", url: "/finance/taxes" },
    ],
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: Coins,
    children: [
      { title: "Chart of Accounts", url: "/accounts/chart" },
      { title: "Ledger", url: "/accounts/ledger" },
      { title: "Balances", url: "/accounts/balances" },
    ],
  },
  {
    title: "HRM",
    url: "/hrm",
    icon: Users,
    children: [
      { title: "Employees", url: "/hrm/employees" },
      { title: "Attendance", url: "/hrm/attendance" },
      { title: "Payroll", url: "/hrm/payroll" },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: NotepadText,
    children: [
      { title: "Sales Report", url: "/reports/sales" },
      { title: "Inventory Report", url: "/reports/inventory" },
      { title: "Finance Report", url: "/reports/finance" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    children: [
      { title: "Profile", url: "/settings/profile" },
      { title: "Users", url: "/settings/users" },
      { title: "Preferences", url: "/settings/preferences" },
    ],
  },
]