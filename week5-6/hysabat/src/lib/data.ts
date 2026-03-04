import { Box, ChartColumnIncreasing, CirclePercent, Coins, Landmark, NotepadText, Settings, ShoppingBag, ShoppingCart, Truck, Users } from "lucide-react";
import type { Module } from "./types";

// Sidebar Items
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
      { title: "Customers Clearance", url: "/customers-clearance" },
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
      { title: "Users and Roles", url: "/users-roles" },
      { title: "Payment Methods", url: "#" },
      { title: "Preferences", url: "#" },
      { title: "Business Info", url: "#" },
    ],
  },
]

// Customers
export const dummyCustomers = Array.from({ length: 25 }, (_, i) => ({
  id: `CUS-00${i + 1}`,
  fullName: ["John Doe", "Sarah Smith", "TechCorp", "Jane Roe"][i % 4],
  fullNameAr: ["جون دو", "سارة سميث", "تيك كوورب", "جين رو"][i % 4],
  phone: `+44-555-010${i + 1000}`,
  contact: `contact${i}@example.com`,
  creditLimit: 5000 + (i * 100),
  vatNumber: `VAT${10000 + i}`,
  invoiceCount: i + 2,
}));

// Projects
export const dummyProjects = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Project ${String.fromCharCode(65 + i)}`,
}));

// Salesmen
export const dummySalesmen = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  fullName: ["Ali Khan", "Ahmed Raza", "Sara Malik", "Omar Hassan"][i % 4],
  fullNameAr: ["علي خان", "أحمد رضا", "سارة مالك", "عمر حسن"][i % 4],
  phone: `+92-300-555-${1000 + i}`,
  email: `salesman${i}@example.com`,
  itemsSold: 50 + i * 7,
  totalAmount: 15000 + i * 1250,
}))

// Responsible Persons
export const dummyResponsiblePersons = Array.from({ length: 10 }, (_, i) => ({
  id: `RESP-${i + 1}`,
  name: `Person ${i + 1}`,
}));

// Products
export const dummyProducts = Array.from({ length: 15 }, (_, i) => ({
  id: `PRD-${200 + i}`,
  name: ["HP Elite 840 G9", "Steel Rebar 12mm", "Cement Bag 50kg", "Concrete Mix"][i % 4],
  sellPrice: 1000 + (i * 150),
  costPrice: 800 + (i * 100),
  vatRate: 15,
  stock: 10 + i,
  barcode: `8273645${i}`,
  unit: "psc",
  category: "Electronics",
  description: "High quality commercial grade material for construction.",
}));

// Services
export const dummyServices = Array.from({ length: 10 }, (_, i) => ({
  id: `SRV-${300 + i}`,
  name: ["Consultation Service", "Delivery Service", "Site Inspection", "Maintenance"][i % 4],
  sellPrice: 500 + (i * 50),
  costPrice: 200 + (i * 20),
  vatRate: 15,
  stock: 0,
  barcode: `992288${i}`,
  unit: "hr",
  category: "Maintainance",
  description: "Professional services provided by certified engineers.",
}));

// Invoices
export const dummyInvoices = Array.from({ length: 30 }, (_, i) => ({
  id: `INV-10${100 + i}`,
  customerName: ["John Doe", "Sarah Smith", "TechCorp", "Jane Roe"][i % 4],
  invoiceType: i % 2 === 0 ? "Tax" : "Simplified Tax",
  totalItems: 1 + (i % 8),
  grandTotal: 500 + i * 150,
  vatAmount: i % 2 === 0 ? (500 + i * 150) * 0.15 : 0,
  issueDate: new Date(2025, 1, 1 + i).toISOString().split("T")[0],
  paymentStatus: ["Paid", "Unpaid", "Partially Paid"][i % 3],
}))

// Permission modules
export const modules: Module[] = [
  {
    id: "sales",
    label: "Sales",
    permissions: [
      { id: "customer-projects", label: "Customer Projects" },
      { id: "customer-targets", label: "Customer Targets" },
      { id: "sale-invoice", label: "Sale Invoice" },
      { id: "sale-return", label: "Sale Return" },
      { id: "sale-take-away", label: "Sale Take Away" },
      { id: "sale-quotations", label: "Sale Quotations" },
      { id: "customer-clearance", label: "Customer Clearance" },
      { id: "commission", label: "Commission" },
    ],
  },
  {
    id: "car-inspection",
    label: "Car Inspection",
    permissions: [
      { id: "inspection-services", label: "Inspection Services" },
      { id: "sales", label: "Sales" },
      { id: "invoices", label: "Invoices" },
      { id: "inspections", label: "Inspections" },
      { id: "inspections-report", label: "Inspections Report" },
    ],
  },
  {
    id: "purchases",
    label: "Purchases",
    permissions: [
      { id: "suppliers", label: "Suppliers" },
      { id: "supplier-targets", label: "Supplier Targets" },
      { id: "purchase-invoice", label: "Purchase Invoice" },
      { id: "purchase-return", label: "Purchase Return" },
      { id: "purchase-recieve", label: "Purchase Recieve" },
      { id: "purchase-order", label: "Purchase Order" },
      { id: "supplier-clearance", label: "Supplier Clearance" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    permissions: [
      { id: "items", label: "Items" },
      { id: "item-transfer", label: "Item Transfer" },
      { id: "services", label: "Services" },
      { id: "item-adjustments", label: "Item Adjustments" },
      { id: "item-reservation", label: "Item Reservation" },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    permissions: [
      { id: "journal-entries", label: "Journal Entries" },
      { id: "charts-of-accounts", label: "Charts of Accounts" },
      { id: "cost-centers", label: "Cost Centers" },
    ],
  },
  {
    id: "Employees",
    label: "Employees",
    permissions: [
      { id: "staff", label: "Staff" },
      { id: "staff-salaries", label: "Staff Salaries" },
      { id: "cost-centers", label: "Cost Centers" },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    permissions: [
      { id: "users", label: "Users" },
      { id: "roles", label: "Roles" },
      { id: "payment-terminal", label: "Payment Terminal" },
      { id: "item-categories-units", label: "Item Categories and Units" },
      { id: "configurations", label: "Configurations" },
      { id: "business-info", label: "Business Info" },
      { id: "vat", label: "VAT" },
      { id: "notifications", label: "Notifications" },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    permissions: [
      { id: "analytics", label: "Analytics" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    permissions: [
      { id: "sales-report", label: "Sales Report" },
      { id: "customers-report", label: "Customers Report" },
      { id: "sales-return-report", label: "Sales Return Report" },
      { id: "sales-profit-report", label: "Sales Profit Report" },
      { id: "sales-item-report", label: "Sales Item Report" },
      { id: "customer-invoices-report", label: "Customer Invoices Report" },
      { id: "supplier-invoices-report", label: "Supplier Invoices Report" },
      { id: "sales-vat-report", label: "Sales Vat Report" },
      { id: "purchase-vat-report", label: "Purchase Vat Report" },
      { id: "total-vat-report", label: "Total Vat Report" },
      { id: "customers-account-balance-report", label: "Customers Account Balance Report" },
      { id: "suppliers-account-balance-report", label: "Suppliers Account Balance Report" },
      { id: "account-statement-report", label: "Account Statement Report" },
      { id: "payment-received-report", label: "Payment Received Report" },
      { id: "payment-made-report", label: "Payment Made Report" },
      { id: "sales-quotation-report", label: "Sales Quotation Report" },
      { id: "suppliers-report", label: "Suppliers Report" },
      { id: "purchase-report", label: "Purchase Report" },
      { id: "purchase-return-report", label: "Purchase Return Report" },
      { id: "purchase-item-report", label: "Purchase Item Report" },
      { id: "items-report", label: "Items Report" },
      { id: "inventory-adjustment-report", label: "Inventory Adjustment Report" },
      { id: "inventory-transfer-report", label: "Inventory Transfer Report" },
      { id: "net-profit-report", label: "Net Profit Report" },
      { id: "item-profit-report", label: "Item Profit Report" },
      { id: "gross-profit-report", label: "Gross Profit Report" },
      { id: "income-statements-report", label: "Income Statements Report" },
      { id: "trial-balance-report", label: "Trial Balance Report" },
      { id: "balance-sheet-report", label: "Balance Sheet Report" },
    ],
  },
  {
    id: "counters",
    label: "Counters",
    permissions: [
      { id: "counter", label: "Counter" },
    ],
  },
  {
    id: "hrm",
    label: "HRM",
    permissions: [
      { id: "expenditure-type", label: "Expenditure Type" },
      { id: "attendance-status", label: "Attendance Status" },
      { id: "department", label: "Department" },
      { id: "designation", label: "Designation" },
      { id: "employee", label: "Employee" },
      { id: "incentive", label: "Incentive" },
      { id: "leave-policy", label: "Leave Policy" },
      { id: "leave-type", label: "Leave Type" },
      { id: "level", label: "Level" },
      { id: "payroll", label: "Payroll" },
      { id: "leave-request", label: "Leave Request" },
      { id: "advance-cash-request", label: "Advance Cash Request" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    permissions: [
      { id: "expenditure", label: "Expenditure" },
      { id: "opening-balance", label: "Opening Balance" },
      { id: "financial-year", label: "Financial Year" },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    permissions: [
      { id: "sale-delivery", label: "Sale Delivery" },
      { id: "driver", label: "Driver" },
    ],
  },
]