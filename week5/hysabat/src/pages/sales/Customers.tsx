import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { CloudUpload, Plus } from "lucide-react"

const Customers = () => {

  return (
    <div className="space-y-4">
      {/* Header */}
      <header>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-theme1">Customers</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline"><CloudUpload />Bulk Import</Button>
            <Button className='text-white bg-theme1 hover:bg-theme1/90'>
              <Plus />Add Customer
              <Kbd className="bg-transparent border text-white">Ctrl+Shift+C</Kbd>
            </Button>
          </div>
        </div>
      </header>

      <Separator />


    </div>
  )
}

export default Customers