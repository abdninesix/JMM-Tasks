import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Kbd } from '@/components/ui/kbd';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import { dummyProducts } from '@/lib/data';
import type { InvoiceFormValues } from '@/pages/sales/sales-invoice/CreateSalesInvoice';
import { Box, History, Plus, Search, Tag, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFieldArray, useWatch, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

const Products = ({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 500);
    const filteredProducts = useMemo(() => {
        return dummyProducts
            .filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
            .slice(0, 4);
    }, [debouncedSearch]);

    const { control, register, formState: { errors } } = form;
    const { fields: productFields, append: appendProduct, remove: removeProduct, replace: replaceProducts } = useFieldArray({ control, name: "products", });
    const productValues = useWatch({ control, name: "products" });

    const handleAddProduct = (product: typeof dummyProducts[0]) => {
        appendProduct({
            id: product.id,
            name: product.name,
            unit: product.unit,
            unitPrice: product.sellPrice,
            quantity: 1,
            discount: 0,
            vatRate: product.vatRate,
        });
        setSearch("");
        setIsOpen(false);
        toast.success("Product added!")
    };

    const computedProducts = useMemo(() => {
        return productValues.map(p => {
            const lineTotal = p.unitPrice * p.quantity - p.discount;
            const vatAmount = (lineTotal * p.vatRate) / 100;
            return {
                ...p,
                lineTotal,
                vatAmount,
                total: lineTotal + vatAmount,
            };
        });
    }, [productValues]);


    return (
        <div className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between space-y-4">
                <h2 className="font-semibold text-theme1">Products ({productFields.length})</h2>
                <Button type="button" variant="outline" size="sm" onClick={() => replaceProducts([])}>Clear all products</Button>
            </div>
            <InputGroup className="relative">
                <InputGroupAddon><Search /></InputGroupAddon>
                <InputGroupInput
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setIsOpen(e.target.value.length > 0);
                    }}
                    placeholder="Search products (e.g cement, steel, concrete etc)"
                />
                {isOpen && <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); setSearch("") }}><X /></Button>}
                {isOpen && (
                    <div className="w-full space-y-4 bg-card border rounded-md shadow-md absolute overflow-y-autos p-2 z-50 top-12">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="w-full p-4 bg-card hover:bg-muted group border flex flex-col lg:flex-row gap-4 rounded-md">
                                <div className="p-2 size-20 lg:size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                                <div className="w-full space-y-2">
                                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                                        <h3 className="text-lg lg:text-xl">{product.name}</h3>
                                        <div className="flex gap-4">
                                            <Button type="button" variant="outline"><History />View Price History</Button>
                                            <Button type="button" onClick={() => handleAddProduct(product)} className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">product</p>
                                        <p className="border bg-muted rounded px-1">{product.category}</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                        <div className="grid grid-cols-2">
                                            <span>Sell Price:</span>
                                            <span className="text-green-500">{product.sellPrice} &#65020;</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>VAT Rate</span>
                                            <span>{product.vatRate}%</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Stock</span>
                                            <span className="text-green-500">{product.stock}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Cost Price</span>
                                            <span>{product.costPrice} &#65020;</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Barcode</span>
                                            <span>{product.barcode}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Unit</span>
                                            <span>{product.unit}</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" className="w-full text-theme1">
                            <Box />
                            Add New Product
                            <Kbd className="border">Shift+P</Kbd>
                        </Button>
                    </div>
                )}
            </InputGroup>
            <p className="text-sm text-red-500">{errors.products?.message}</p>

            {productFields.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
                    <Box className="size-12 lg:size-15" />
                    <h2 className="text-theme1">No products added</h2>
                    <p className="text-sm">Search and add products using the search box above</p>
                </div>
            ) : (
                <div className="">
                    <ul className="p-2 bg-theme1 text-white font-semibold grid grid-cols-10 items-center">
                        <li>Product name</li>
                        <li>Unit</li>
                        <li>Unit Price</li>
                        <li>Quantity</li>
                        <li>Discount</li>
                        <li>Line Total</li>
                        <li>VAT Category</li>
                        <li>VAT Amount</li>
                        <li>Total</li>
                        <li>Actions</li>
                    </ul>
                    {productFields.map((field, index) => (
                        <ul key={field.id} className="p-2 grid grid-cols-10 items-center gap-2 text-sm wrap-anywhere">
                            <li>{field.name}</li>
                            <li>{field.unit}</li>
                            <li>{field.unitPrice}</li>
                            <input
                                type="number"
                                min={1}
                                {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                            />
                            <input
                                type="number"
                                min={0}
                                {...register(`products.${index}.discount`, { valueAsNumber: true })}
                            />
                            <li>{computedProducts[index]?.lineTotal}</li>
                            <li>Standard {field.vatRate}%</li>
                            <li>{computedProducts[index]?.vatAmount}</li>
                            <li>{computedProducts[index]?.total}</li>
                            <Button type="button" size="icon" variant="ghost" onClick={() => removeProduct(index)}><Trash2 className="size-4" /></Button>
                        </ul>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products