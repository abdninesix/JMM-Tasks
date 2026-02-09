import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox"
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { dummyCustomers, dummyProjects, dummyResponsiblePersons, dummySalesmen } from "@/lib/data"
import { Banknote, BookText, Box, CalendarIcon, ChevronDownIcon, CreditCard, FileIcon, History, Landmark, Plus, PlusCircle, Search, Settings, Tag, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Kbd } from "@/components/ui/kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

const CreateSalesInvoice = () => {

  const [invoiceType, setInvoiceType] = useState<string>("tax")
  const [issueDate, setIssueDate] = useState<Date>()
  const [supplyDate, setSupplyDate] = useState<Date>()

  const anchor = useComboboxAnchor()

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

      <form className="space-y-4" onSubmit={(e: React.SubmitEvent) => e.preventDefault()}>

        {/* Inputs */}
        <Label>Invoice Type</Label>
        <RadioGroup defaultValue="tax" className="flex max-w-xs" onValueChange={(value) => setInvoiceType(value)}>
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
        <div className="flex flex-wrap gap-4 mt-6">
          <Field className="max-w-50">
            <Label>Transaction Type</Label>
            <Select >
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="apple">Type A</SelectItem>
                <SelectItem value="banana">Type B</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field className="max-w-50">
            <Label>Customer Name</Label>
            <Combobox items={dummyCustomers.map((customer) => customer.fullName)}>
              <ComboboxInput placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No customers found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  {(item, index) => (
                    <ComboboxItem key={`${item}-${index}`} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          {invoiceType === "tax" && <Field className="max-w-50">
            <Label>Select Project (Optional)</Label>
            <Combobox items={dummyProjects.map((project) => project.name)}>
              <ComboboxInput placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No Pojects found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  {(item, index) => (
                    <ComboboxItem key={`${item}-${index}`} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>}

          <Field className="max-w-50">
            <Label>Salesman</Label>
            <Combobox items={dummySalesmen.map((salesman) => salesman.name)}>
              <ComboboxInput placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No Salesman found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  {(item, index) => (
                    <ComboboxItem key={`${item}-${index}`} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="max-w-50">
            <Label>Responsible Person</Label>
            <Combobox multiple autoHighlight items={dummyResponsiblePersons.map((res) => res.name)}>
              <ComboboxChips ref={anchor}>
                <ComboboxValue>
                  {(values) => (
                    <>
                      {values.map((value: string) => (<ComboboxChip key={value}>{value}</ComboboxChip>))}
                      <ComboboxChipsInput placeholder="Select people" />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No person found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  {(item, index) => (
                    <ComboboxItem key={`${item}-${index}`} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="max-w-50">
            <Label>Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!issueDate}
                  className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
                >
                  {issueDate ? format(issueDate, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={issueDate}
                  onSelect={setIssueDate}
                  defaultMonth={issueDate}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field className="max-w-50">
            <Label>Supply Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!supplyDate}
                  className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal"
                >
                  {supplyDate ? format(supplyDate, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={supplyDate}
                  onSelect={setSupplyDate}
                  defaultMonth={supplyDate}
                />
              </PopoverContent>
            </Popover>
          </Field>

          {invoiceType === "tax" && <Field className="max-w-50">
            <Label>VAT No.</Label>
            <Input type="number" placeholder="Enter VAT No." />
          </Field>}
        </div>

        {/* Products */}
        <div className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between space-y-4">
            <h2 className="font-semibold text-theme1">Products (0)</h2>
            <Button variant="outline" size="sm">Clear all products</Button>
          </div>
          <InputGroup className="relative">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search products (e.g cement, steel, concrete etc)" />
            <div className="hidden w-full space-y-4 bg-card absolute top-14">
              <div className="w-full p-4 bg-card hover:bg-muted group border flex gap-4 rounded-md">
                <div className="p-2 size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-xl">HP Elite 840 G9</h3>
                    <div className="flex gap-4">
                      <Button variant="outline"><History />View Price History</Button>
                      <Button className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">product</p>
                    <p className="border bg-muted rounded px-1">electronics</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="grid grid-cols-2">
                      <span>Sell Price:</span>
                      <span className="text-green-500">4250.00 &#65020;</span>
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
                      <span>3400.00 &#65020;</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Barcode</span>
                      <span>123456789</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Unit</span>
                      <span>psc &#65020;</span>
                    </div>
                  </div>
                  <Separator />
                  <p>Introducing the latest cutting edge technology: The Smart TechPro 3000.</p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-theme1">
                <Box />
                Add New Product
                <Kbd className="border">Shift+P</Kbd>
              </Button>
            </div>
          </InputGroup>
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
            <Box className="size-15" />
            <h2 className="text-theme1">No products added</h2>
            <p>Search and add products using the search box above</p>
          </div>
          <div className="hidden">
            <div className="p-2 bg-theme1 text-white font-semibold grid grid-cols-10">
              <span>Product name</span>
              <span>Unit</span>
              <span>Unit Price</span>
              <span>Quantity</span>
              <span>Discount</span>
              <span>Line Total</span>
              <span>VAT Category</span>
              <span>VAT Amount</span>
              <span>Total</span>
              <span>Actions</span>
            </div>
            <div className="p-2 grid grid-cols-10 gap-2 text-sm wrap-anywhere">
              <span>Steel Rebar 12mm</span>
              <span>Ton</span>
              <span>120.00</span>
              <span>1</span>
              <span>0%</span>
              <span>130.00</span>
              <span>Standard 15%</span>
              <span>18.00</span>
              <span>138.00</span>
              <span><Trash2 className="size-4" /></span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between space-y-4">
            <h2 className="font-semibold text-theme1">Services (0)</h2>
            <Button variant="outline" size="sm">Clear all services</Button>
          </div>
          <InputGroup className="relative">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput placeholder="Search services (e.g cement, steel, concrete etc)" />
            {/* This opens during search */}
            <div className="hidden w-full space-y-4 bg-card absolute top-14">
              <div className="w-full p-4 bg-card hover:bg-muted group border flex gap-4 rounded-md">
                <div className="p-2 size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-xl">Consultation Service</h3>
                    <div className="flex gap-4">
                      <Button variant="outline"><History />View Price History</Button>
                      <Button className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">service</p>
                    <p className="border bg-muted rounded px-1">electronics</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="grid grid-cols-2">
                      <span>Sell Price:</span>
                      <span className="text-green-500">4250.00 &#65020;</span>
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
                      <span>3400.00 &#65020;</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Barcode</span>
                      <span>123456789</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Unit</span>
                      <span>psc &#65020;</span>
                    </div>
                  </div>
                  <Separator />
                  <p>Introducing the latest cutting edge technology: The Smart TechPro 3000.</p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="text-green-500">
                  <PlusCircle />
                  Add As Non Created Service
                  <Kbd className="border">Shift+P</Kbd>
                </Button>
                <Button variant="outline" className="text-theme1">
                  <Settings />
                  Add New Service
                  <Kbd className="border">Shift+P</Kbd>
                </Button>
              </div>
            </div>
          </InputGroup>
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
            <Settings className="size-15" />
            <h2 className="text-theme1">No services added</h2>
            <p>Search and add services using the search box above</p>
          </div>
          <div className="hidden">
            <div className="p-2 bg-theme1 text-white font-semibold grid grid-cols-10">
              <span>Service name</span>
              <span>Unit</span>
              <span>Unit Price</span>
              <span>Quantity</span>
              <span>Discount</span>
              <span>Line Total</span>
              <span>VAT Category</span>
              <span>VAT Amount</span>
              <span>Total</span>
              <span>Actions</span>
            </div>
            <div className="p-2 grid grid-cols-10 gap-2 text-sm wrap-anywhere">
              <span>Delivery Service</span>
              <span>Ton</span>
              <span>120.00</span>
              <span>1</span>
              <span>0%</span>
              <span>130.00</span>
              <span>Standard 15%</span>
              <span>18.00</span>
              <span>138.00</span>
              <span><Trash2 className="size-4" /></span>
            </div>
          </div>
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
                <Textarea className="wrap-anywhere" placeholder="Type and hit enter" />
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
                <Textarea className="wrap-anywhere" placeholder="Type and hit enter" />
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="w-full space-y-4">
            {/* Summary */}
            <div className="p-4 space-y-4 bg-card border rounded-md font-extrabold">
              <h2 className="text-xl text-theme1">Summary</h2>
              <div className="grid grid-cols-2">
                <span>Total (Exc VAT)</span>
                <span className="font-semibold text-end">500 &#65020;</span>
              </div>
              <div className="grid grid-cols-2">
                <span>VAT Category</span>
                <span className="font-semibold text-end">S 5%</span>
              </div>
              <div className="grid grid-cols-2">
                <span>Discount%</span>
                <span className="font-semibold text-end">15%</span>
              </div>
              <div className="grid grid-cols-2">
                <span>Discount Amount</span>
                <span className="font-semibold text-end">00 &#65020;</span>
              </div>
              <div className="grid grid-cols-2">
                <span>Taxable Amount</span>
                <span className="font-semibold text-end">500 &#65020;</span>
              </div>
              <div className="grid grid-cols-2">
                <span>VAT Total</span>
                <span className="font-semibold text-end">500 &#65020;</span>
              </div>
              <div className="grid grid-cols-2 text-theme1">
                <span>Grand Total</span>
                <span className="text-end">1500 &#65020;</span>
              </div>
            </div>
            {/* Payment Type */}
            <div className="p-4 space-y-4 bg-card border rounded-md">
              <h2 className="text-xl font-bold">Payment Type</h2>
              <Tabs defaultValue="full">
                <TabsList>
                  <TabsTrigger className="p-4 rounded-r-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="full">Full</TabsTrigger>
                  <TabsTrigger className="p-4 rounded-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="partial">Partial</TabsTrigger>
                  <TabsTrigger className="p-4 rounded-l-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="none">No Payment</TabsTrigger>
                </TabsList>
                <TabsContent className="py-4 space-y-4" value="full">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <Switch />
                    <h2 className="text-lg font-semibold text-theme1">Split Payment</h2>
                    <p className="text-sm text-muted-foreground">You can choose two payment methods if split payment is enabled.</p>
                  </div>
                  <div className="p-4 rounded-md border space-y-4">
                    <div className="flex gap-2">
                      <RadioGroup defaultValue="cash" className="flex flex-col lg:flex-row w-full lg:max-w-md">
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
              <Button className="py-6 bg-theme1 hover:bg-theme1/90 text-lg text-white w-full">
                Save and Proceed
                <Kbd className="border border-white text-white bg-transparent">Ctrl+Enter</Kbd>
              </Button>
            </div>
          </div>
        </div>

      </form>

    </div>
  )
}

export default CreateSalesInvoice