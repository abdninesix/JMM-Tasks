import type { Customer } from "@/pages/sales/customers/columns";
import { Box, ChartColumnIncreasing, CirclePercent, Coins, Landmark, NotepadText, Settings, ShoppingBag, ShoppingCart, Truck, Users } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    url: "/",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Sales",
    url: "#",
    icon: CirclePercent,
    children: [
      { title: "Customers", url: "/customers" },
      { title: "Customers Clearance", url: "#" },
      { title: "Sales Invoice", url: "/sales-invoice" },
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

export const dummyCustomers: Customer[] = Array.from({ length: 25 }, (_, i) => ({
    id: `CUS-00${i + 1}`,
    fullName: ["John Doe", "Sarah Smith", "TechCorp", "Jane Roe"][i % 4],
    fullNameAr: ["جون دو", "سارة سميث", "تيك كوورب", "جين رو"][i % 4],
    phone: `+44-555-010${i + 1000}`,
    contact: `contact${i}@example.com`,
    creditLimit: 5000 + (i * 100),
    vatNumber: `VAT${10000 + i}`,
    invoiceCount: i + 2,
}));