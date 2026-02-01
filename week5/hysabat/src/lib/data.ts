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
      { title: "Customers Clearance", url: "#" },
      { title: "Sales Invoice", url: "#" },
      { title: "Sales Quotation", url: "#" },
      { title: "Performa Invoice", url: "#" },
      { title: "Sales Commission", url: "#" },
    ],
  },
  {
    title: "Purchases",
    url: "#",
    icon: Box,
    children: [
      { title: "Suppliers", url: "#" },
      { title: "Purchase Invoice", url: "#" },
      { title: "Request for Quotation", url: "#" },
      { title: "Purchase Order", url: "#" },
    ],
  },
  {
    title: "Inventory",
    url: "#",
    icon: ShoppingCart,
    children: [
      { title: "Item Directory", url: "#" },
      { title: "Reservation", url: "#" },
      { title: "Transfer Request", url: "#" },
      { title: "Transfer History", url: "#" },
      { title: "Adjustment", url: "#" },
    ],
  },
  {
    title: "Delivery",
    url: "#",
    icon: Truck,
    children: [
      { title: "Sales Delivery", url: "#" },
      { title: "Drivers", url: "#" },
    ],
  },
  {
    title: "POS",
    url: "#",
    icon: ShoppingBag,
    children: [
      { title: "POS", url: "#" },
      { title: "Counters", url: "#" },
    ],
  },
  {
    title: "Finance",
    url: "#",
    icon: Landmark,
    children: [
      { title: "Expenditure", url: "#" },
      { title: "Opening Balance", url: "#" },
      { title: "Financial Year", url: "#" },
    ],
  },
  {
    title: "Accounts",
    url: "#",
    icon: Coins,
    children: [
      { title: "Journal Entries", url: "#" },
      { title: "Charts of Accounts", url: "#" },
    ],
  },
  {
    title: "HRM",
    url: "#",
    icon: Users,
    children: [
      { title: "Dashboard", url: "#" },
      { title: "Employees", url: "#" },
      { title: "Attendance", url: "#" },
      { title: "Requests", url: "#" },
      { title: "Payrolls", url: "#" },
      { title: "Org-Structure", url: "#" },
      { title: "Reports", url: "#" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    children: [
      { title: "Users and Roles", url: "#" },
      { title: "Payment Methods", url: "#" },
      { title: "Preferences", url: "#" },
      { title: "Business Info", url: "#" },
    ],
  },
]