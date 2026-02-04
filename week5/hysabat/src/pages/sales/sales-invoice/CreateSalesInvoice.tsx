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
import { dummyCustomers } from "@/lib/data"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const CreateSalesInvoice = () => {

  const [issueDate, setIssueDate] = useState<Date>()
  const [supplyDate, setSupplyDate] = useState<Date>()

  const anchor = useComboboxAnchor()

  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sales" },
            { label: "Sales Invoice", href: "/sales-invoice" },
            { label: "Create Sales Invoice" },
          ]}
        />
        <h1 className="text-2xl font-semibold text-theme1">Create Sales Invoice</h1>
      </header>

      <Separator />

      {/* Inputs */}
      <>
        <>
          <Label>Invoice Type</Label>
          <RadioGroup defaultValue="tax" className="flex max-w-2xs">
            <FieldLabel htmlFor="tax">
              <Field orientation="horizontal">
                <FieldTitle>Tax</FieldTitle>
                <RadioGroupItem value="tax" id="tax" className=" text-white" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="simplified-tax">
              <Field orientation="horizontal">
                <FieldTitle>Simplified Tax</FieldTitle>
                <RadioGroupItem value="simplified-tax" id="simplified-tax" className=" text-white" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </>
        <div className="flex flex-wrap gap-4 mt-6">
          <Field className="w-fit">
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

          <Field className="w-fit">
            <Label>Customer Name</Label>
            <Combobox items={dummyCustomers.map((customer) => customer.fullName)}>
              <ComboboxInput className="p-2" placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No customers found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="w-fit">
            <Label>Select Project (Optional)</Label>
            <Combobox>
              <ComboboxInput className="p-2" placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No Pojects found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  <ComboboxItem value="">Project 1</ComboboxItem>
                  <ComboboxItem value="">Project 2</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="w-fit">
            <Label>Salesman</Label>
            <Combobox>
              <ComboboxInput className="p-2" placeholder="Type and search..." />
              <ComboboxContent>
                <ComboboxEmpty>No Salesman found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  <ComboboxItem value="">Salesman 1</ComboboxItem>
                  <ComboboxItem value="">Salesman 2</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="w-fit">
            <Label>Responsible Person</Label>
            <Combobox multiple autoHighlight>
              <ComboboxChips ref={anchor}>
                <ComboboxValue>
                  {(values) => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput placeholder="Select people" />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No person found.</ComboboxEmpty>
                <ComboboxList className="scrollbar-none">
                  <ComboboxItem value="Person1">Person 1</ComboboxItem>
                  <ComboboxItem value="Person2">Person 2</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <Field className="w-fit">
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

          <Field className="w-fit">
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

          <Field className="w-fit">
            <Label>VAT No.</Label>
            <Input placeholder="Enter VAT No." className="" />
          </Field>
        </div>
      </>

    </div>
  )
}

export default CreateSalesInvoice