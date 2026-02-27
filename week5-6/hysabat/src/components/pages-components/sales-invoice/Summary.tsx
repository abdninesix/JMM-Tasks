import { memo, useMemo } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import type { InvoiceFormValues } from "./InvoiceSchema";
import { SaudiRiyal } from "lucide-react";

const Summary = memo(({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

    const products = useWatch({ control: form.control, name: "invoiceItems" }) || [];
    const services = useWatch({ control: form.control, name: "invoiceServices" }) || [];

    const productTotals = useMemo(() => {
        return products.reduce((acc, item) => {
            const lineTotal = (item.sellPrice * item.quantity) - item.discountAmount;
            const vatAmount = (lineTotal * item.vATPercentage) / 100;

            acc.subTotal += lineTotal;
            acc.vatTotal += vatAmount;
            acc.discountTotal += item.discountAmount;
            return acc;
        }, { subTotal: 0, vatTotal: 0, discountTotal: 0 });
    }, [products]);

    const ServiceTotals = useMemo(() => {
        return services.reduce((acc, item) => {
            const lineTotal = (item.unitPrice * item.quantity) - item.discount;
            const vatAmount = (lineTotal * item.vatRate) / 100;

            acc.subTotal += lineTotal;
            acc.vatTotal += vatAmount;
            acc.discountTotal += item.discount;
            return acc;
        }, { subTotal: 0, vatTotal: 0, discountTotal: 0 });
    }, [services]);

    const totals = {
        subTotal: productTotals.subTotal + ServiceTotals.subTotal,
        vatTotal: productTotals.vatTotal + ServiceTotals.vatTotal,
        discountTotal: productTotals.discountTotal + ServiceTotals.discountTotal,
    };

    const grandTotal = productTotals.subTotal + productTotals.vatTotal + ServiceTotals.subTotal + ServiceTotals.vatTotal;
    
    return (
        <div className="p-4 space-y-4 bg-card border rounded-md font-extrabold">
            <h2 className="text-xl text-theme1">Summary</h2>
            <div className="grid grid-cols-2">
                <span>Total (Exc VAT)</span>
                <span className="flex items-center justify-end font-semibold"><SaudiRiyal size={15} />{totals.subTotal.toFixed(2)}</span>
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
                <span className="flex items-center justify-end font-semibold"><SaudiRiyal size={15} />{totals.discountTotal}</span>
            </div>
            <div className="grid grid-cols-2">
                <span>Taxable Amount</span>
                <span className="flex items-center justify-end font-semibold"><SaudiRiyal size={15} />500</span>
            </div>
            <div className="grid grid-cols-2">
                <span>VAT Total</span>
                <span className="flex items-center justify-end font-semibold"><SaudiRiyal size={15} />{totals.vatTotal.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 text-theme1">
                <span>Grand Total</span>
                <span className="flex items-center justify-end"><SaudiRiyal size={15} />{grandTotal.toFixed(2)}</span>
            </div>
        </div>
    )
}
)

export default Summary