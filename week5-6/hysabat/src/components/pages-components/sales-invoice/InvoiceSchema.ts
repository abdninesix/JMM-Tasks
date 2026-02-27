import z from "zod";

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceType: z.enum(["TAX", "SIMPLIFIED_TAX"]),
  saleInvoiceSpecialTransactionType: z.string().min(1, "Transaction type is required"),
  customerId: z.number().nullable(),
  saleManId: z.number().nullable(),
  projectId: z.number().nullable(),
  issuedDate: z.date().nullable(),
  supplyDate: z.date().nullable(),
  vatCategoryId: z.number().optional(),
  notes: z.string().optional(),
  termsAndConditions: z.string().optional(),
  paymentType: z.enum(["FULL", "PARTIAL", "NO_PAYMENT"]),
  // splitPayment: z.boolean(),
  paymentMethod: z.enum(["CASH", "CARD", "E_TRANSFER"]),
  invoiceItems: z.array(z.object({
    itemId: z.number(),
    taxId: z.number(),
    metaDescription: z.string(),
    unitId: z.number(),
    unit: z.string(),
    sellPrice: z.number(),
    quantity: z.number().min(1),
    discountAmount: z.number(),
    discountPercentage: z.number().min(0).max(100),
    vATPercentage: z.number(),
  })).min(1, "No products added"),
  invoiceServices: z.array(z.object({
    id: z.number(),
    name: z.string(),
    unit: z.string(),
    unitPrice: z.number(),
    quantity: z.number().min(1),
    discount: z.number(),
    vatRate: z.number(),
  })).min(1, "No services added"),
  discountPercentage: z.number().min(0).max(100).optional(),
  discountAmount: z.number().min(0).optional(),
  amountPaid: z.number().min(0).optional(),
})
  .superRefine((data, ctx) => {
    if (!data.customerId) {
      ctx.addIssue({
        path: ["customerId"],
        message: "Customer is required",
        code: "custom",
      });
    }
    if (!data.saleManId) {
      ctx.addIssue({
        path: ["saleManId"],
        message: "Salesman is required",
        code: "custom",
      });
    }
    if (!data.projectId && data.invoiceType === "TAX") {
      ctx.addIssue({
        path: ["projectId"],
        message: "Project is required",
        code: "custom",
      });
    }
    if (!data.issuedDate) {
      ctx.addIssue({
        path: ["issuedDate"],
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
    if (!data.vatCategoryId && data.invoiceType === "TAX") {
      ctx.addIssue({
        path: ["vatCategoryId"],
        message: "VAT Number is required",
        code: "custom",
      });
    }
  })

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;