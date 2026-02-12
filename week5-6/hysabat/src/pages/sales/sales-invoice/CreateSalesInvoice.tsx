import { useEffect, useMemo, useState } from "react"
import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { dummyProducts, dummyServices } from "@/lib/data"
import { Banknote, BookText, CalendarIcon, ChevronDownIcon, CreditCard, FileIcon, History, Landmark, Plus, PlusCircle, Search, Settings, Tag, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Kbd } from "@/components/ui/kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useDebounce } from "@/hooks/useDebounce"
import Summary from "@/components/pages-components/sales-invoice/Summary"
import Products from "@/components/pages-components/sales-invoice/Products"

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
    lineTotal: z.number(),
    vatAmount: z.number(),
    total: z.number(),
  })).min(1, "No products added"),
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    unit: z.string(),
    unitPrice: z.number(),
    quantity: z.number().min(1),
    discount: z.number(),
    vatRate: z.number(),
    lineTotal: z.number(),
    vatAmount: z.number(),
    total: z.number(),
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

const CreateSalesInvoice = () => {

  const [productSearch, setProductSearch] = useState("");
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [isServiceSearchOpen, setIsServiceSearchOpen] = useState(false);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceType: "tax",
      transactionType: "",
      // customerId: "",
      issueDate: null,
      supplyDate: null,
      vatNumber: "",
      notes: "",
      terms: "",
      paymentType: "full",
      splitPayment: false,
      paymentMethod: "cash",
      products: [],
      services: [],
    },
  });

  const { watch, control, handleSubmit, formState: { errors } } = form;

  const invoiceType = watch("invoiceType");
  const products = useWatch({ control, name: "products" });
  const services = useWatch({ control, name: "services" });
  // const anchor = useComboboxAnchor()

  const { fields: productFields, append: appendProduct, remove: removeProduct, replace: replaceProducts } = useFieldArray({ control, name: "products", });
  const { fields: serviceFields, append: appendService, remove: removeService, replace: replaceServices } = useFieldArray({ control, name: "services", });

  const debouncedProductSearch = useDebounce(productSearch, 500);
  const filteredProducts = useMemo(() => {
    return dummyProducts
      .filter(p => p.name.toLowerCase().includes(debouncedProductSearch.toLowerCase()))
      .slice(0, 4);
  }, [debouncedProductSearch]);
  
  const debouncedServiceSearch = useDebounce(serviceSearch, 500);
  const filteredServices = useMemo(() => {
    return dummyServices
      .filter(p => p.name.toLowerCase().includes(debouncedServiceSearch.toLowerCase()))
      .slice(0, 4);
  }, [debouncedServiceSearch]);

  const handleAddProduct = (product: typeof dummyProducts[0]) => {
    const lineTotal = product.sellPrice * 1;
    const vatAmount = (lineTotal * product.vatRate) / 100;
    appendProduct({
      id: product.id,
      name: product.name,
      unit: product.unit,
      unitPrice: product.sellPrice,
      quantity: 1,
      discount: 0,
      lineTotal: lineTotal,
      vatRate: product.vatRate,
      vatAmount: vatAmount,
      total: lineTotal + vatAmount,
    });
    setProductSearch("");
    setIsProductSearchOpen(false);
    toast.success("Product added!")
  };

  useEffect(() => {
    products.forEach((p, i) => {
      const lineTotal = p.unitPrice * p.quantity - p.discount;
      const vatAmount = (lineTotal * p.vatRate) / 100;
      const total = lineTotal + vatAmount;

      form.setValue(`products.${i}.lineTotal`, lineTotal);
      form.setValue(`products.${i}.vatAmount`, vatAmount);
      form.setValue(`products.${i}.total`, total);
    });
  }, [JSON.stringify(products)]);

  const handleAddService = (service: typeof dummyServices[0]) => {
    const lineTotal = service.sellPrice * 1;
    const vatAmount = (lineTotal * service.vatRate) / 100;
    appendService({
      id: service.id,
      name: service.name,
      unit: service.unit,
      unitPrice: service.sellPrice,
      quantity: 1,
      discount: 0,
      lineTotal: lineTotal,
      vatRate: service.vatRate,
      vatAmount: vatAmount,
      total: lineTotal + vatAmount,
    });
    setServiceSearch("");
    setIsServiceSearchOpen(false);
    toast.success("Service added!")
  };

  useEffect(() => {
    services.forEach((p, i) => {
      const lineTotal = p.unitPrice * p.quantity - p.discount;
      const vatAmount = (lineTotal * p.vatRate) / 100;
      const total = lineTotal + vatAmount;

      form.setValue(`services.${i}.lineTotal`, lineTotal);
      form.setValue(`services.${i}.vatAmount`, vatAmount);
      form.setValue(`services.${i}.total`, total);
    });
  }, [JSON.stringify(services)]);

  const summary = useMemo(() => {
    const allItems = [...(products ?? []), ...(services ?? [])];
    const subTotal = allItems.reduce((s, i) => s + i.lineTotal, 0);
    const vatTotal = allItems.reduce((s, i) => s + i.vatAmount, 0);
    const discountTotal = allItems.reduce((s, i) => s + i.discount, 0);
    const grandTotal = subTotal + vatTotal - discountTotal;
    return { subTotal, vatTotal, discountTotal, grandTotal };
  }, [JSON.stringify(products), JSON.stringify(services)]);

  const onSubmit = handleSubmit((data) => {
    console.log("Form Errors:", errors);
    console.log("Form Data:", data);
    toast.success("Invoice created!")
  });

  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb
          items={[
            { label: "Sales" },
            { label: "Sales Invoice", href: "/sales-invoice" },
            { label: "Create Sales Invoice" },
          ]}
        />
        <h1 className="text-2xl font-semibold text-theme1">Create Sales Invoice</h1>
      </header>

      <Separator />

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

        {/* Inputs */}
        <Label>Invoice Type</Label>
        <Controller
          control={control}
          name="invoiceType"
          render={({ field }) => (
            <RadioGroup value={field.value} className="flex max-w-xs" onValueChange={field.onChange}>
              <FieldLabel htmlFor="tax" className="has-data-[state=checked]:border-theme1">
                <Field orientation="horizontal">
                  <FieldTitle>Tax</FieldTitle>
                  <RadioGroupItem value="tax" id="tax" className="text-white" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="simplified-tax" className="has-data-[state=checked]:border-theme1">
                <Field orientation="horizontal">
                  <FieldTitle>Simplified Tax</FieldTitle>
                  <RadioGroupItem value="simplified-tax" id="simplified-tax" className="text-white" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          )} />

        <div className="flex flex-wrap gap-4 mt-6">
          <Field className="max-w-50">
            <Label>Transaction Type</Label>
            <Controller
              name="transactionType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="type-a">Type A</SelectItem>
                    <SelectItem value="type-b">Type B</SelectItem>
                  </SelectContent>
                </Select>
              )} />
            <p className="text-sm text-red-500">{errors.transactionType?.message}</p>
          </Field>

          {/* <Field className="max-w-50">
            <Label>Customer Name</Label>
            <Controller
              name="customerId"
              control={control}
              render={({ field }) => (
                <Combobox
                  value={field.value}
                  onValueChange={field.onChange}
                  items={dummyCustomers.map((c) => ({ id: c.id, name: c.fullName }))}
                >
                  <ComboboxInput placeholder="Type and search..." />
                  <ComboboxContent>
                    <ComboboxEmpty>No customers found.</ComboboxEmpty>
                    <ComboboxList className="scrollbar-none">
                      {(item) => (
                        <ComboboxItem key={item.id} value={item.id}>
                          {item.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )} />
            <p className="text-sm text-red-500">{errors.customerId?.message}</p>
          </Field> */}

          <Field className="max-w-50">
            <Label>Issue Date</Label>
            <Controller
              name="issueDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
                    >
                      {field.value ? format(field.value, "PPP") : "Pick date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      defaultMonth={field.value ?? new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )} />
            <p className="text-sm text-red-500">{errors.issueDate?.message}</p>
          </Field>

          <Field className="max-w-50">
            <Label>Supply Date</Label>
            <Controller
              name="supplyDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
                    >
                      {field.value ? format(field.value, "PPP") : "Pick date"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      defaultMonth={field.value ?? new Date()}
                    />
                  </PopoverContent>
                </Popover>
              )} />
            <p className="text-sm text-red-500">{errors.supplyDate?.message}</p>
          </Field>

          {invoiceType === "tax" && <Field className="max-w-50">
            <Label>VAT No.</Label>
            <Controller
              name="vatNumber"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter VAT No." />
              )} />
            <p className="text-sm text-red-500">{errors.vatNumber?.message}</p>
          </Field>}
        </div>

        {/* Products */}
        <Products
          form={form}
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          isOpen={isProductSearchOpen}
          setIsOpen={setIsProductSearchOpen}
          filteredProducts={filteredProducts}
          productFields={productFields}
          productValues={products}
          onAdd={handleAddProduct}
          onRemove={removeProduct}
          onClear={() => replaceProducts([])}
          error={errors.products?.message}
        />

        {/* Services */}
        <div className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between space-y-4">
            <h2 className="font-semibold text-theme1">Services ({serviceFields.length})</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => replaceServices([])}>Clear all services</Button>
          </div>
          <InputGroup className="relative">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput
              value={serviceSearch}
              onChange={(e) => {
                setServiceSearch(e.target.value)
                setIsServiceSearchOpen(e.target.value.length > 0);
              }}
              placeholder="Search services (e.g delivery, maintenance, consultation etc)"
            />
            {isServiceSearchOpen && <Button type="button" variant="ghost" onClick={() => { setIsServiceSearchOpen(false); setServiceSearch("") }}><X /></Button>}
            {isServiceSearchOpen && (
              <div className="w-full space-y-4 bg-card border rounded-md shadow-md absolute overflow-y-autos p-2 z-50 top-12">
                {filteredServices.map((service) => (
                  <div key={service.id} className="w-full p-4 bg-card hover:bg-muted group border flex gap-4 rounded-md">
                    <div className="p-2 size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                    <div className="w-full space-y-2">
                      <div className="flex justify-between">
                        <h3 className="text-xl">{service.name}</h3>
                        <div className="flex gap-4">
                          <Button type="button" variant="outline"><History />View Price History</Button>
                          <Button type="button" onClick={() => handleAddService(service)} className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                        </div>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">service</p>
                        <p className="border bg-muted rounded px-1">{service.category}</p>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="grid grid-cols-2">
                          <span>Sell Price:</span>
                          <span className="text-green-500">{service.sellPrice} &#65020;</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span>VAT Rate</span>
                          <span>{service.vatRate}%</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span>Stock</span>
                          <span className="text-green-500">{service.stock}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span>Cost Price</span>
                          <span>{service.costPrice} &#65020;</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span>Barcode</span>
                          <span>{service.barcode}</span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span>Unit</span>
                          <span>{service.unit}</span>
                        </div>
                      </div>
                      <Separator />
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 items-center justify-center">
                  <Button type="button" variant="outline" className="w-fit text-green-500">
                    <PlusCircle />
                    Add As Non Created Service
                    <Kbd className="border">Enter</Kbd>
                  </Button>
                  <Button type="button" variant="outline" className="w-fit text-theme1">
                    <Settings />
                    Add New Service
                    <Kbd className="border">Shift+S</Kbd>
                  </Button>
                </div>
              </div>
            )}
          </InputGroup>
          <p className="text-sm text-red-500">{errors.services?.message}</p>

          {serviceFields.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
              <Settings className="size-15" />
              <h2 className="text-theme1">No services added</h2>
              <p className="text-sm">Search and add services using the search box above</p>
            </div>
          ) : (
            <div className="">
              <ul className="p-2 bg-theme1 text-white font-semibold grid grid-cols-10">
                <li>Service name</li>
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
              {serviceFields.map((field, index) => (
                <ul key={field.id} className="p-2 grid grid-cols-10 items-center gap-2 text-sm wrap-anywhere">
                  <li>{field.name}</li>
                  <li>{field.unit}</li>
                  <li>{field.unitPrice}</li>
                  <input
                    type="number"
                    min={1}
                    {...form.register(`services.${index}.quantity`, { valueAsNumber: true })}
                  />
                  <input
                    type="number"
                    min={0}
                    {...form.register(`services.${index}.discount`, { valueAsNumber: true })}
                  />
                  <li>{services[index]?.lineTotal}</li>
                  <li>Standard {field.vatRate}%</li>
                  <li>{services[index]?.vatAmount}</li>
                  <li>{services[index]?.total}</li>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeService(index)}><Trash2 className="size-4" /></Button>
                </ul>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Additional Info */}
          <div className="lg:w-3/5 h-fit space-y-4 p-4 bg-card border rounded-md">
            <h2 className="font-semibold">Additional Information</h2>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-1 w-full group text-theme1">
                <FileIcon className="size-5" />
                <span className="font-semibold">Notes</span>
                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} className="wrap-anywhere" placeholder="Type and hit enter" />
                  )} />
              </CollapsibleContent>
            </Collapsible>
            <Separator />
            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-1 w-full group text-theme1">
                <BookText className="size-5" />
                <span className="font-semibold">Terms & Conditions</span>
                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} className="wrap-anywhere" placeholder="Type and hit enter" />
                  )} />
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="w-full space-y-4">
            {/* Summary */}
            <Summary
              subTotal={summary.subTotal}
              vatTotal={summary.vatTotal}
              discountTotal={summary.discountTotal}
              grandTotal={summary.grandTotal}
            />
            {/* Payment Type */}
            <div className="p-4 space-y-4 bg-card border rounded-md">
              <h2 className="text-xl font-bold">Payment Type</h2>
              <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                  <Tabs value={field.value} onValueChange={field.onChange}>
                    <TabsList>
                      <TabsTrigger className="p-4 rounded-r-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="full">Full</TabsTrigger>
                      <TabsTrigger className="p-4 rounded-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="partial">Partial</TabsTrigger>
                      <TabsTrigger className="p-4 rounded-l-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="none">No Payment</TabsTrigger>
                    </TabsList>
                    <TabsContent className="py-4 space-y-4" value="full">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <Controller
                          name="splitPayment"
                          control={control}
                          render={({ field }) => (
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          )} />
                        <h2 className="text-lg font-semibold text-theme1">Split Payment</h2>
                        <p className="text-sm text-muted-foreground">You can choose two payment methods if split payment is enabled.</p>
                      </div>
                      <div className="p-4 rounded-md border space-y-4">
                        <div className="flex gap-2">
                          <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col lg:flex-row w-full lg:max-w-md">
                                <FieldLabel htmlFor="cash" className="border-none bg-accent has-data-[state=checked]:bg-green-500 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-500 dark:has-data-[state=checked]:text-white">
                                  <Field orientation="horizontal">
                                    <Banknote size={18} />
                                    <FieldTitle className="font-bold">Cash</FieldTitle>
                                    <RadioGroupItem value="cash" id="cash" className="hidden" />
                                  </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="card" className="border-none bg-accent has-data-[state=checked]:bg-green-500 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-500 dark:has-data-[state=checked]:text-white">
                                  <Field orientation="horizontal">
                                    <CreditCard size={18} />
                                    <FieldTitle className="font-bold">Card</FieldTitle>
                                    <RadioGroupItem value="card" id="card" className="hidden" />
                                  </Field>
                                </FieldLabel>
                                <FieldLabel htmlFor="e-transfer" className="border-none bg-accent has-data-[state=checked]:bg-green-500 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-500 dark:has-data-[state=checked]:text-white">
                                  <Field orientation="horizontal">
                                    <Landmark size={18} />
                                    <FieldTitle className="font-bold">E-transfer</FieldTitle>
                                    <RadioGroupItem value="e-transfer" id="e-transfer" className="hidden" />
                                  </Field>
                                </FieldLabel>
                              </RadioGroup>
                            )} />
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 font-extrabold text-green-500">
                          <span>Change</span>
                          <span className="text-end">1500 &#65020;</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="py-4 space-y-4" value="partial">
                      <p className="text-muted-foreground">Partial payment is selected.</p>
                    </TabsContent>

                    <TabsContent className="py-4 space-y-4" value="none">
                      <p className="text-muted-foreground">No payment is selected.</p>
                    </TabsContent>
                  </Tabs>
                )} />
              <Button type="submit" onClick={onSubmit} className="py-6 bg-theme1 hover:bg-theme1/90 text-lg text-white w-full">
                Save and Proceed
                <Kbd className="border border-white text-white bg-transparent">Ctrl+Enter</Kbd>
              </Button>
            </div>
          </div>
        </div>

      </form >

    </div >
  )
}

export default CreateSalesInvoice