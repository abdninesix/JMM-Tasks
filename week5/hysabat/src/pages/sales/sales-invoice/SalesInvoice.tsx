import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SalesInvoice = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      {/* Header Section */}
      <header className="space-y-2">
        <AppBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Sales" }, { label: "Sales Invoice" }]} />
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-semibold text-theme1">Sales Invoice</h1>
          <Button onClick={() => navigate("/sales-invoice/create")} className='text-white bg-theme1 hover:bg-theme1/90'>
            <Plus />Create Invoice <Kbd className="bg-transparent text-white border">Ctrl+Alt+I</Kbd>
          </Button>
        </div>
      </header>

      <Separator />


    </div>
  )
}

export default SalesInvoice