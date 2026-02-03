import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

const SalesInvoice = () => {
  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Sales" }, { label: "Sales Invoice" }]} />
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <h1 className="text-2xl font-semibold text-theme1">Sales Invoice</h1>
          <div className="flex items-center gap-4">
            <Button className='text-white bg-theme1 hover:bg-theme1/90'>
              <Plus />Create Invoice <Kbd className="bg-transparent text-white border">Ctrl+Alt+I</Kbd>
            </Button>
          </div>
        </div>
      </header>

      <Separator />


    </div>
  )
}

export default SalesInvoice