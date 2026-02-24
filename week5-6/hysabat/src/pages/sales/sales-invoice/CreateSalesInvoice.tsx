import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Banknote, BookText, CalendarIcon, ChevronDownIcon, CreditCard, FileIcon, Landmark } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Kbd } from "@/components/ui/kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Summary from "@/components/pages-components/sales-invoice/Summary"
import Products from "@/components/pages-components/sales-invoice/Products"
import Services from "@/components/pages-components/sales-invoice/Services"
import { invoiceSchema, type InvoiceFormValues } from "@/components/pages-components/sales-invoice/InvoiceSchema"
import ReactQuill from "react-quill-new"

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const CreateSalesInvoice = () => {

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
  // const anchor = useComboboxAnchor()

  const onSubmit = handleSubmit((data) => {
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

        <Products form={form} />

        <Services form={form} />

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
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Type and hit enter..."
                      className="[&_.ql-editor]:min-h-30 [&_.ql-editor]:max-w-md"
                    />
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
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Type and hit enter..."
                      className="[&_.ql-editor]:min-h-30 [&_.ql-editor]:max-w-md"
                    />
                  )} />
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="w-full space-y-4">

            {/* Summary */}
            <Summary form={form} />

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