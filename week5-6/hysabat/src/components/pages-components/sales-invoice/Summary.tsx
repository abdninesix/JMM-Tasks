import { memo } from "react";


type Props = {
    subTotal: number;
    vatTotal: number;
    discountTotal: number;
    grandTotal: number;
};

const Summary = memo(({ subTotal, vatTotal, discountTotal, grandTotal }: Props) => {
    return (
        <div className="p-4 space-y-4 bg-card border rounded-md font-extrabold">
            <h2 className="text-xl text-theme1">Summary</h2>
            <div className="grid grid-cols-2">
                <span>Total (Exc VAT)</span>
                <span className="font-semibold text-end">{subTotal} &#65020;</span>
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
                <span className="font-semibold text-end">{discountTotal} &#65020;</span>
            </div>
            <div className="grid grid-cols-2">
                <span>Taxable Amount</span>
                <span className="font-semibold text-end">500 &#65020;</span>
            </div>
            <div className="grid grid-cols-2">
                <span>VAT Total</span>
                <span className="font-semibold text-end">{vatTotal} &#65020;</span>
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