import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Kbd } from '@/components/ui/kbd';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import { Box, History, Plus, SaudiRiyal, Search, Tag, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFieldArray, useWatch, type UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import type { InvoiceFormValues } from './InvoiceSchema';
import { useQuery } from '@apollo/client/react';
import { PRODUCT_QUERY } from '@/graphql/queries';

type ApiProduct = {
    itemId: number;
    taxId: number;
    itemNameEnglish: string;
    wholeSellPrice: number;
    costPrice: number;
    barCode: string;
    category?: {
        categoryNameEnglish: string;
    };
    itemUnitOfMeasure?: Array<{
        nameEnglish: string;
        unitId: number;
    }>;
}

type ProductQueryData = {
    items: {
        nodes: ApiProduct[];
    };
}

type ProductQueryVariables = {
    search: string;
}

const Products = ({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const { data, loading } = useQuery<ProductQueryData, ProductQueryVariables>(PRODUCT_QUERY, {
        variables: { search: debouncedSearch || "" },
        skip: !isFocused && !debouncedSearch,
    });

    const products: ApiProduct[] = data?.items?.nodes || [];

    const { control, register, formState: { errors } } = form;
    const { fields: productFields, append: appendProduct, remove: removeProduct, replace: replaceProducts } = useFieldArray({ control, name: "invoiceItems", });
    const productValues = useWatch({ control, name: "invoiceItems" });

    const handleAddProduct = (product: ApiProduct) => {
        appendProduct({
            itemId: product.itemId,
            taxId: product.taxId,
            metaDescription: product.itemNameEnglish,
            unitId: product.itemUnitOfMeasure?.[0].unitId || 0,
            unit: product.itemUnitOfMeasure?.[0].nameEnglish || "No unit",
            sellPrice: product.wholeSellPrice,
            quantity: 1,
            discountAmount: 0,
            discountPercentage: 0,
            vATPercentage: 15,
        });
        setSearch("");
        setIsOpen(false);
        toast.success("Product added!")
    };

    const computedProducts = useMemo(() => {
        return productValues.map((p: InvoiceFormValues["invoiceItems"][number]) => {
            const grossTotal = p.sellPrice * p.quantity;
            const discountAmount = (grossTotal * p.discountPercentage) / 100;
            const lineTotal = grossTotal - discountAmount;
            const vatAmount = (lineTotal * p.vATPercentage) / 100;
            return {
                ...p,
                discountAmount,
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
                    onFocus={() => {
                        setIsFocused(true);
                        setIsOpen(true);
                    }}
                    onBlur={() => setTimeout(() => {
                        setIsFocused(false);
                        setIsOpen(false);
                    }, 200)}

                    placeholder="Search products (e.g cement, steel, concrete etc)"
                />
                {isOpen && <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); setSearch("") }}><X /></Button>}
                {isOpen && (
                    <div className="w-full space-y-4 bg-card border rounded-md shadow-md absolute overflow-y-autos p-2 z-50 top-12">
                        {products.length > 0 ? (products.map((product: ApiProduct) => (
                            <div key={product.itemId} className="w-full p-4 bg-card hover:bg-muted group border flex flex-col lg:flex-row gap-4 rounded-md">
                                <div className='flex justify-between'>
                                    <div className="p-2 size-20 lg:size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                                    <div className="flex flex-col lg:hidden gap-4">
                                        <Button type="button" variant="outline" size="sm"><History />View Price History</Button>
                                        <Button type="button" size="sm" onClick={() => handleAddProduct(product)} className="bg-theme1 text-white"><Plus />Add to Cart</Button>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                                        <h3 className="text-xl lg:text-2xl mb-2 wrap-anywhere">{product.itemNameEnglish}</h3>
                                        <div className="hidden lg:flex gap-4">
                                            <Button type="button" variant="outline"><History />View Price History</Button>
                                            <Button type="button" onClick={() => handleAddProduct(product)} className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">product</p>
                                        {product.category && <p className="border bg-muted rounded px-1">{product.category?.categoryNameEnglish}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                        <div className="grid grid-cols-2">
                                            <span>Sell Price:</span>
                                            <span className="flex items-center text-green-500"><SaudiRiyal size={15} />{product.wholeSellPrice}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>VAT Rate</span>
                                            <span>15%</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Stock</span>
                                            <span className="text-green-500">15</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Cost Price</span>
                                            <span className="flex items-center"><SaudiRiyal size={15} />{product.costPrice}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Barcode</span>
                                            <span>{product.barCode || "No barcode"}</span>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span>Unit</span>
                                            <span>{product.itemUnitOfMeasure?.[0].nameEnglish || "No unit"}</span>
                                        </div>
                                    </div>
                                    <Separator className='my-2' />
                                    <p>No description</p>
                                </div>
                            </div>
                        ))) : (
                            <p className="p-4 text-center text-muted-foreground">
                                {loading ? "Searching..." : "No products found"}
                            </p>
                        )
                        }
                        <Button type="button" variant="outline" className="w-full text-theme1">
                            <Box />
                            Add New Product
                            <Kbd className="border">Shift+P</Kbd>
                        </Button>
                    </div>
                )}
            </InputGroup>
            <p className="text-sm text-red-500">{errors.invoiceItems?.message}</p>

            {productFields.length === 0 ? (
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
                    <Box className="size-12 lg:size-15" />
                    <h2 className="text-theme1">No products added</h2>
                    <p className="text-xs lg:text-sm">Search and add products using the search box above</p>
                </div>
            ) : (
                <>
                    {productFields.map((field, index) => {
                        const computed = computedProducts[index];
                        return (
                            <div key={field.id} className='bg-accent grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-10 border'>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Product name</h3>
                                    <p className='p-2 text-sm'>{field.metaDescription}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Unit</h3>
                                    <p className='p-2 text-sm'>{field.unit}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='flex items-center p-2 bg-theme1 text-white font-semibold'>Unit Price (<SaudiRiyal size={14} />)</h3>
                                    <p className='p-2 text-sm'>{field.sellPrice.toFixed(2)}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Quantity</h3>
                                    <input
                                        type="number"
                                        min={1}
                                        className='p-2 text-sm bg-input'
                                        {...register(`invoiceItems.${index}.quantity`, { valueAsNumber: true })}
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Discount (%)</h3>
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        className='p-2 text-sm bg-input'
                                        {...register(`invoiceItems.${index}.discountPercentage`, { valueAsNumber: true })}
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Line Total</h3>
                                    <p className='p-2 text-sm'>{computed?.lineTotal.toFixed(2)}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>VAT Category</h3>
                                    <p className='p-2 text-sm'>Standard {field.vATPercentage}%</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>VAT Amount</h3>
                                    <p className='p-2 text-sm'>{computed?.vatAmount.toFixed(2)}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='flex items-center p-2 bg-theme1 text-white font-semibold'>Total (<SaudiRiyal size={14} />)</h3>
                                    <p className='p-2 text-sm'>{computed?.total.toFixed(2)}</p>
                                </div>
                                <div className='space-y-1'>
                                    <h3 className='p-2 bg-theme1 text-white font-semibold'>Actions</h3>
                                    <Button type="button" size="icon" variant="ghost" onClick={() => removeProduct(index)}><Trash2 className="size-4" /></Button>
                                </div>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default Products