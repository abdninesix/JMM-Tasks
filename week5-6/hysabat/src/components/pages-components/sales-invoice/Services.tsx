import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { dummyServices } from "@/lib/data";
import type { InvoiceFormValues } from "@/pages/sales/sales-invoice/CreateSalesInvoice";
import { History, Plus, PlusCircle, Search, Settings, Tag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const Services = ({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const filteredServices = useMemo(() => {
    return dummyServices
      .filter(p => p.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .slice(0, 4);
  }, [debouncedSearch]);

  const { control, register, formState: { errors } } = form;
  const { fields: serviceFields, append: appendService, remove: removeService, replace: replaceServices } = useFieldArray({ control, name: "services", });
  const serviceValues = useWatch({ control, name: "services" });

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
    setSearch("");
    setIsOpen(false);
    toast.success("Service added!")
  };

  useEffect(() => {
    serviceValues.forEach((p, i) => {
      const lineTotal = p.unitPrice * p.quantity - p.discount;
      const vatAmount = (lineTotal * p.vatRate) / 100;
      const total = lineTotal + vatAmount;

      form.setValue(`services.${i}.lineTotal`, lineTotal);
      form.setValue(`services.${i}.vatAmount`, vatAmount);
      form.setValue(`services.${i}.total`, total);
    });
  }, [serviceValues]);

  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between space-y-4">
        <h2 className="font-semibold text-theme1">Services ({serviceFields.length})</h2>
        <Button type="button" variant="outline" size="sm" onClick={() => replaceServices([])}>Clear all services</Button>
      </div>
      <InputGroup className="relative">
        <InputGroupAddon><Search /></InputGroupAddon>
        <InputGroupInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(e.target.value.length > 0);
          }}
          placeholder="Search services (e.g delivery, maintenance, consultation etc)"
        />
        {isOpen && <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); setSearch("") }}><X /></Button>}
        {isOpen && (
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
                {...register(`services.${index}.quantity`, { valueAsNumber: true })}
              />
              <input
                type="number"
                min={0}
                {...register(`services.${index}.discount`, { valueAsNumber: true })}
              />
              <li>{serviceValues[index]?.lineTotal}</li>
              <li>Standard {field.vatRate}%</li>
              <li>{serviceValues[index]?.vatAmount}</li>
              <li>{serviceValues[index]?.total}</li>
              <Button type="button" size="icon" variant="ghost" onClick={() => removeService(index)}><Trash2 className="size-4" /></Button>
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}

export default Services