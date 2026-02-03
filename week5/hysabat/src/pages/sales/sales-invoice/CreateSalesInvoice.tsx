import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const CreateSalesInvoice = () => {

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

      {/* Types */}
      <div>
        <Label className="py-4">Invoice Type</Label>
        <RadioGroup defaultValue="plus" className="flex w-fit">
          <FieldLabel htmlFor="plus-plan">
            <Field orientation="horizontal">
              <FieldTitle>Plus</FieldTitle>
              <RadioGroupItem value="plus" id="plus-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="pro-plan">
            <Field orientation="horizontal">
              <FieldTitle>Pro</FieldTitle>
              <RadioGroupItem value="pro" id="pro-plan" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </div>

    </div>
  )
}

export default CreateSalesInvoice