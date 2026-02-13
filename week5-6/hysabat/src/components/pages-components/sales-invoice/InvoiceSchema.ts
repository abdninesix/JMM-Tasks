import z from "zod";

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