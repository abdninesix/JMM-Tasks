import { AppBreadcrumb } from "@/components/AppBreadcrumb"
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


    </div>
  )
}

export default CreateSalesInvoice