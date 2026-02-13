import type { Customer } from "@/pages/sales/customers/columns";
import { Box, ChartColumnIncreasing, CirclePercent, Coins, Landmark, NotepadText, Settings, ShoppingBag, ShoppingCart, Truck, Users } from "lucide-react";
import z from "zod";

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

// Customers
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

// Projects
export const dummyProjects = Array.from({ length: 5 }, (_, i) => ({
  id: `PROJ-${100 + i}`,
  name: `Project ${String.fromCharCode(65 + i)}`,
}));

// Salesmen
export const dummySalesmen = Array.from({ length: 5 }, (_, i) => ({
  id: `SLS-${i + 1}`,
  name: `Salesman ${i + 1}`,
}));

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

// Invoices Schema
export const invoiceSchema = z.object({
  invoiceType: z.enum(["tax", "simplified-tax"]),
  transactionType: z.string().min(1, "Transaction type is required"),
  // customerId: z.string().min(1, "Customer is required"),
  issueDate: z.date().nullable(),
  supplyDate: z.date().nullable(),
  vatNumber: z.string().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  paymentType: z.enum(["full", "partial", "none"]),
  splitPayment: z.boolean(),
  paymentMethod: z.enum(["cash", "card", "e-transfer"]),
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    unit: z.string(),
    unitPrice: z.number(),
    quantity: z.number().min(1),
    discount: z.number(),
    vatRate: z.number(),
  })).min(1, "No products added"),
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    unit: z.string(),
    unitPrice: z.number(),
    quantity: z.number().min(1),
    discount: z.number(),
    vatRate: z.number(),
  })).min(1, "No services added"),
})
  .superRefine((data, ctx) => {
    if (!data.issueDate) {
      ctx.addIssue({
        path: ["issueDate"],
        message: "Issue date is required",
        code: "custom",
      });
    }
    if (!data.supplyDate) {
      ctx.addIssue({
        path: ["supplyDate"],
        message: "Supply date is required",
        code: "custom",
      });
    }
    if (!data.vatNumber && data.invoiceType === "tax") {
      ctx.addIssue({
        path: ["vatNumber"],
        message: "VAT Number is required",
        code: "custom",
      });
    }
  })

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;