import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useDebounce } from "@/hooks/useDebounce";
import { History, Plus, PlusCircle, SaudiRiyal, Search, Settings, Tag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { InvoiceFormValues } from "./InvoiceSchema";
import { useQuery } from "@apollo/client/react";
import { SERVICE_QUERY } from "@/graphql/queries";

type ApiService = {
  serviceId: number;
  taxId: number;
  serviceNameEnglish: string;
  price: number;
  costPrice: number;
  barCode: string;
  category?: {
    categoryNameEnglish: string;
  };
}

type ServiceQueryData = {
  services: {
    nodes: ApiService[];
  };
}

type ServiceQueryVariables = {
  search: string;
}

const Services = ({ form }: { form: UseFormReturn<InvoiceFormValues>; }) => {

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, loading } = useQuery<ServiceQueryData, ServiceQueryVariables>(SERVICE_QUERY, {
    variables: { search: debouncedSearch || "" },
    skip: !isFocused && !debouncedSearch,
  });

  const services: ApiService[] = data?.services?.nodes || [];

  const { control, register, formState: { errors } } = form;
  const { fields: serviceFields, append: appendService, remove: removeService, replace: replaceServices } = useFieldArray({ control, name: "invoiceServices", });
  const serviceValues = useWatch({ control, name: "invoiceServices" });

  const handleAddService = (service: ApiService) => {
    appendService({
      serviceId: service.serviceId,
      taxId: service.taxId,
      serviceDescription: service.serviceNameEnglish,
      price: service.price,
      quantity: 1,
      discountAmount: 0,
      discountPercentage: 0,
      vATPercentage: 15,
    });
    setSearch("");
    setIsOpen(false);
    toast.success("Service added!")
  };

  const computedServices = useMemo(() => {
    return serviceValues.map((s: InvoiceFormValues["invoiceServices"][number]) => {
      const grossTotal = s.price * s.quantity;
      const discountAmount = (grossTotal * s.discountPercentage) / 100;
      const lineTotal = grossTotal - discountAmount;
      const vatAmount = (lineTotal * s.vATPercentage) / 100;
      return {
        ...s,
        discountAmount,
        lineTotal,
        vatAmount,
        total: lineTotal + vatAmount,
      };
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
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setTimeout(() => {
            setIsFocused(false);
            setIsOpen(false);
          }, 200)}
          placeholder="Search services (e.g delivery, maintenance, consultation etc)"
        />
        {isOpen && <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); setSearch("") }}><X /></Button>}
        {isOpen && (
          <div className="w-full space-y-4 bg-card border rounded-md shadow-md absolute overflow-y-autos p-2 z-50 top-12">
            {services.length > 0 ? (services.map((service) => (
              <div key={service.serviceId} className="w-full p-4 bg-card hover:bg-muted group border flex flex-col lg:flex-row gap-4 rounded-md">
                <div className='flex justify-between'>
                  <div className="p-2 size-20 lg:size-32 rounded-md bg-muted text-muted-foreground" ><Tag className="size-full" /></div>
                  <div className="flex flex-col lg:hidden gap-4">
                    <Button type="button" variant="outline" size="sm"><History />View Price History</Button>
                    <Button type="button" size="sm" onClick={() => handleAddService(service)} className="bg-theme1 text-white"><Plus />Add to Cart</Button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <h3 className="text-xl lg:text-2xl mb-2 wrap-anywhere">{service.serviceNameEnglish}</h3>
                    <div className="hidden lg:flex gap-4">
                      <Button type="button" variant="outline"><History />View Price History</Button>
                      <Button type="button" onClick={() => handleAddService(service)} className="bg-theme1 hover:bg-theme1/90 text-white"><Plus />Add to Cart</Button>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <p className="border border-theme1 bg-theme1/10 text-theme1 rounded px-1">service</p>
                    {service.category && <p className="border bg-muted rounded px-1">{service.category?.categoryNameEnglish}</p>}
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="grid grid-cols-2">
                      <span>Sell Price:</span>
                      <span className="flex items-center text-green-500"><SaudiRiyal size={15} />{service.price}</span>
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
                      <span className="flex items-center"><SaudiRiyal size={15} />{service.costPrice}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Barcode</span>
                      <span>{service.barCode || "No barcode"}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span>Unit</span>
                      <span>No unit</span>
                    </div>
                  </div>
                  <Separator className='my-2' />
                  <p>No description</p>
                </div>
              </div>
            ))) : (
              <p className="p-4 text-center text-muted-foreground">
                {loading ? "Searching..." : "No services found"}
              </p>
            )
            }
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
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
      <p className="text-sm text-red-500">{errors.invoiceServices?.message}</p>

      {serviceFields.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
          <Settings className="size-15" />
          <h2 className="text-theme1">No services added</h2>
          <p className="text-xs lg:text-sm">Search and add services using the search box above</p>
        </div>
      ) : (
        <>
          {serviceFields.map((field, index) => {
            const computed = computedServices[index];
            return (
              <div key={field.id} className='bg-accent grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-10 border'>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Service name</h3>
                  <p className='p-2 text-sm wrap-anywhere'>{field.serviceDescription}</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Unit</h3>
                  <p className='p-2 text-sm'>No unit</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='flex items-center p-2 bg-theme1 text-white font-semibold'>Unit Price (<SaudiRiyal size={14} />)</h3>
                  <p className='p-2 text-sm'>{field.price.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Quantity</h3>
                  <input
                    type="number"
                    min={1}
                    className='p-2 text-sm bg-input max-w-20'
                    {...register(`invoiceServices.${index}.quantity`, { valueAsNumber: true })}
                  />
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Discount (%)</h3>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className='p-2 text-sm bg-input min-w-20'
                    {...register(`invoiceServices.${index}.discountPercentage`, { valueAsNumber: true })}
                  />
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Line Total</h3>
                  <p className='p-2 text-sm'>{computed?.lineTotal.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>VAT Category</h3>
                  <p className='p-2 text-sm'>Standard {field.vATPercentage}%</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>VAT Amount</h3>
                  <p className='p-2 text-sm'>{computed?.vatAmount.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='flex items-center p-2 bg-theme1 text-white font-semibold'>Total (<SaudiRiyal size={14} />)</h3>
                  <p className='p-2 text-sm'>{computed?.total.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <h3 className='p-2 bg-theme1 text-white font-semibold'>Actions</h3>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeService(index)}><Trash2 className="size-4" /></Button>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Services