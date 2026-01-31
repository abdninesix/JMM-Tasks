import { Box, ChartColumnIncreasing, CirclePercent, Coins, Landmark, NotepadText, Settings, ShoppingBag, ShoppingCart, Truck, Users } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Sales",
    url: "/customers",
    icon: CirclePercent,
    children: [
      { title: "Customers", url: "/customers" },
      { title: "Orders", url: "#" },
      { title: "Invoices", url: "#" },
    ],
  },
  {
    title: "Purchases",
    url: "#",
    icon: ShoppingCart,
    children: [
      { title: "Suppliers", url: "#" },
      { title: "Bills", url: "#" },
      { title: "Purchase Orders", url: "#" },
    ],
  },
  {
    title: "Inventory",
    url: "#",
    icon: Box,
    children: [
      { title: "Products", url: "#" },
      { title: "Stock Levels", url: "#" },
      { title: "Warehouses", url: "#" },
    ],
  },
  {
    title: "Delivery",
    url: "#",
    icon: Truck,
    children: [
      { title: "Shipments", url: "#" },
      { title: "Routes", url: "#" },
      { title: "Tracking", url: "#" },
    ],
  },
  {
    title: "POS",
    url: "#",
    icon: ShoppingBag,
    children: [
      { title: "New Sale", url: "#" },
      { title: "Sessions", url: "#" },
      { title: "Receipts", url: "#" },
    ],
  },
  {
    title: "Finance",
    url: "#",
    icon: Landmark,
    children: [
      { title: "Cash Flow", url: "#" },
      { title: "Expenses", url: "#" },
      { title: "Taxes", url: "#" },
    ],
  },
  {
    title: "Accounts",
    url: "#",
    icon: Coins,
    children: [
      { title: "Chart of Accounts", url: "#" },
      { title: "Ledger", url: "#" },
      { title: "Balances", url: "#" },
    ],
  },
  {
    title: "HRM",
    url: "#",
    icon: Users,
    children: [
      { title: "Employees", url: "#" },
      { title: "Attendance", url: "#" },
      { title: "Payroll", url: "#" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: NotepadText,
    children: [
      { title: "Sales Report", url: "#" },
      { title: "Inventory Report", url: "#" },
      { title: "Finance Report", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    children: [
      { title: "Profile", url: "#" },
      { title: "Users", url: "#" },
      { title: "Preferences", url: "#" },
    ],
  },
]