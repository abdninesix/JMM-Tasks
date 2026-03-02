import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { BookText, CalendarIcon, ChevronDown, FileIcon } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Products from "@/components/pages-components/sales-invoice/Products"
import Services from "@/components/pages-components/sales-invoice/Services"
import Summary from "@/components/pages-components/sales-invoice/Summary"
import Payment from "@/components/pages-components/sales-invoice/Payment"
import { invoiceSchema, type InvoiceFormValues } from "@/components/pages-components/sales-invoice/InvoiceSchema"
import ReactQuill from "react-quill-new"
import { useQuery } from "@apollo/client/react"
import type { Customer, CustomerQueryData } from "../customers/columns"
import { CUSTOMER_QUERY } from "@/graphql/queries"
import { dummyProjects, dummySalesmen } from "@/lib/data"
import { payloadDate } from "@/lib/utils"
import NewComboBox from "@/components/ui/new-combobox"

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const generateInvoiceId = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const CreateSalesInvoice = () => {

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      id: "",
      invoiceType: "TAX",
      saleInvoiceSpecialTransactionType: "",
      customerId: null,
      saleManId: null,
      projectId: null,
      issuedDate: null,
      supplyDate: null,
      vatCategoryId: null,
      notes: "",
      termsAndConditions: "",
      paymentType: "FULL",
      splitPayment: false,
      paymentMethod: "CASH",
      invoiceItems: [],
      invoiceServices: [],
      discountPercentage: 0,
      discountAmount: 0,
      amountPaidCash: 0,
      branchId: "d4550ea5-d656-4f0e-a1ea-d1fafcee2783"
    },
  });

  const { watch, control, handleSubmit, formState: { errors } } = form;

  const invoiceType = watch("invoiceType");

  const { data } = useQuery<CustomerQueryData>(CUSTOMER_QUERY)
  const customers: Customer[] = data?.customers.nodes || []

  const onSubmit = handleSubmit((data) => {

    const finalItems = data.invoiceItems.map((item) => {
      const grossTotal = item.sellPrice * item.quantity;
      const discountAmount = (grossTotal * item.discountPercentage) / 100;
      const { unit, ...rest } = item;
      return {
        ...rest,
        discountAmount,
      };
    });

    const { splitPayment, ...payload } = {
      ...data,
      id: generateInvoiceId(),
      issuedDate: payloadDate(data.issuedDate!),
      supplyDate: payloadDate(data.supplyDate!),
      invoiceItems: finalItems,
    };
    console.log("Form Data:", payload);
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
                  <RadioGroupItem value="TAX" id="tax" className="text-white" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="simplified-tax" className="has-data-[state=checked]:border-theme1">
                <Field orientation="horizontal">
                  <FieldTitle>Simplified Tax</FieldTitle>
                  <RadioGroupItem value="SIMPLIFIED_TAX" id="simplified-tax" className="text-white" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          )} />

        <div className="flex flex-wrap gap-4 mt-6">
          <Field className="max-w-50">
            <Label>Transaction Type</Label>
            <Controller
              name="saleInvoiceSpecialTransactionType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="SUMMARY">Summary</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              )} />
            <p className="text-sm text-red-500">{errors.saleInvoiceSpecialTransactionType?.message}</p>
          </Field>

          <Field className="max-w-50">
            <Label>Customer Name</Label>
            <Controller
              name="customerId"
              control={control}
              render={({ field }) => (
                <NewComboBox
                  options={customers}
                  placeholder="Search or select"
                  getOptionLabel={(customer) => customer.nameEnglish}
                  getOptionValue={(customer) => customer.id}
                  onSelect={(customer) => { field.onChange(customer ? customer.id : null); }}
                />
              )} />
            <p className="text-sm text-red-500">{errors.customerId?.message}</p>
          </Field>

          <Field className="max-w-50">
            <Label>Salesman Name</Label>
            <Controller
              name="saleManId"
              control={control}
              render={({ field }) => (
                <NewComboBox
                  options={dummySalesmen}
                  placeholder="Search or select"
                  getOptionLabel={(salesman) => salesman.fullNameAr}
                  getOptionValue={(salesman) => salesman.id}
                  onSelect={(salesman) => { field.onChange(salesman ? salesman.id : null); }}
                />
              )} />
            <p className="text-sm text-red-500">{errors.saleManId?.message}</p>
          </Field>

          {invoiceType === "TAX" && <Field className="max-w-50">
            <Label>Project Name</Label>
            <Controller
              name="projectId"
              control={control}
              render={({ field }) => (
                <NewComboBox
                  options={dummyProjects}
                  placeholder="Search or select"
                  getOptionLabel={(project) => project.name}
                  getOptionValue={(project) => project.id}
                  onSelect={(project) => { field.onChange(project ? project.id : null); }}
                />
              )} />
            <p className="text-sm text-red-500">{errors.projectId?.message}</p>
          </Field>}

          <Field className="max-w-50">
            <Label>Issued Date</Label>
            <Controller
              name="issuedDate"
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
            <p className="text-sm text-red-500">{errors.issuedDate?.message}</p>
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

          {invoiceType === "TAX" && <Field className="max-w-50">
            <Label>VAT No.</Label>
            <Controller
              name="vatCategoryId"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  placeholder="Enter VAT Category ID" />
              )} />
            <p className="text-sm text-red-500">{errors.vatCategoryId?.message}</p>
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
                <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
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
                <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Controller
                  name="termsAndConditions"
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
            <Summary form={form} />
            <Payment form={form} onSubmit={onSubmit} />
          </div>

        </div>

      </form >

    </div >
  )
}

export default CreateSalesInvoice