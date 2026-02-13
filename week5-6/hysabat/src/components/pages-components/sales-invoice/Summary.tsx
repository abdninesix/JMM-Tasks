import type { InvoiceFormValues } from "@/pages/sales/sales-invoice/CreateSalesInvoice";
import { memo, useMemo } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";

const Summary = memo(({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

    const products = useWatch({ control: form.control, name: "products" }) || [];
    const services = useWatch({ control: form.control, name: "services" }) || [];

    const totals = useMemo(() => {
        const allItems = [...products, ...services];

        return allItems.reduce((acc, item) => {
            const lineTotal = (item.unitPrice * item.quantity) - item.discount;
            const vatAmount = (lineTotal * item.vatRate) / 100;

            acc.subTotal += lineTotal;
            acc.vatTotal += vatAmount;
            acc.discountTotal += item.discount;
            return acc;
        }, { subTotal: 0, vatTotal: 0, discountTotal: 0 });
    }, [products, services]);

    const grandTotal = totals.subTotal + totals.vatTotal;

    return (
        <div className="p-4 space-y-4 bg-card border rounded-md font-extrabold">
            <h2 className="text-xl text-theme1">Summary</h2>
            <div className="grid grid-cols-2">
                <span>Total (Exc VAT)</span>
                <span className="font-semibold text-end">{totals.subTotal} &#65020;</span>
            </div>
            <div className="grid grid-cols-2">
                <span>VAT Category</span>
                <span className="font-semibold text-end">S 15%</span>
            </div>
            <div className="grid grid-cols-2">
                <span>Discount%</span>
                <span className="font-semibold text-end">0%</span>
            </div>
            <div className="grid grid-cols-2">
                <span>Discount Amount</span>
                <span className="font-semibold text-end">{totals.discountTotal} &#65020;</span>
            </div>
            <div className="grid grid-cols-2">
                <span>Taxable Amount</span>
                <span className="font-semibold text-end">500 &#65020;</span>
            </div>
            <div className="grid grid-cols-2">
                <span>VAT Total</span>
                <span className="font-semibold text-end">{totals.vatTotal} &#65020;</span>
            </div>
            <div className="grid grid-cols-2 text-theme1">
                <span>Grand Total</span>
                <span className="text-end">{grandTotal} &#65020;</span>
            </div>
        </div>
    )
}
)

export default Summary