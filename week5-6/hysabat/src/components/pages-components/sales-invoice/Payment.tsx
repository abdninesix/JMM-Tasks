import { Controller, type UseFormReturn } from "react-hook-form";
import type { InvoiceFormValues } from "./InvoiceSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Banknote, CreditCard, Landmark, SaudiRiyal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const Payment = ({ form, onSubmit }: { form: UseFormReturn<InvoiceFormValues>; onSubmit: () => void }) => {

    const { control } = form

    return (
        <div className="p-4 space-y-4 bg-card border rounded-md">
            <h2 className="text-xl font-bold">Payment Type</h2>
            <Controller
                name="paymentType"
                control={control}
                render={({ field }) => (
                    <Tabs value={field.value} onValueChange={field.onChange}>
                        <TabsList>
                            <TabsTrigger className="p-4 rounded-r-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="FULL">Full</TabsTrigger>
                            <TabsTrigger className="p-4 rounded-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="PARTIAL">Partial</TabsTrigger>
                            <TabsTrigger className="p-4 rounded-l-none dark:data-[state=active]:bg-theme1 dark:data-[state=active]:text-white data-[state=active]:bg-theme1 data-[state=active]:text-white" value="NO_PAYMENT">No Payment</TabsTrigger>
                        </TabsList>
                        <TabsContent className="py-4 space-y-4" value="FULL">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                {/* <Controller
                          name="splitPayment"
                          control={control}
                          render={({ field }) => (
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          )} /> */}
                                <Switch />
                                <h2 className="text-lg font-semibold text-theme1">Split Payment</h2>
                                <p className="text-sm text-muted-foreground">You can choose two payment methods if split payment is enabled.</p>
                            </div>
                            <div className="p-4 rounded-md border space-y-4">
                                <div className="flex gap-2">
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col lg:flex-row w-full lg:max-w-md">
                                                <FieldLabel htmlFor="cash" className="border-none bg-accent has-data-[state=checked]:bg-green-600 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-600 dark:has-data-[state=checked]:text-white">
                                                    <Field orientation="horizontal">
                                                        <Banknote size={18} />
                                                        <FieldTitle className="font-bold">Cash</FieldTitle>
                                                        <RadioGroupItem value="CASH" id="cash" className="hidden" />
                                                    </Field>
                                                </FieldLabel>
                                                <FieldLabel htmlFor="card" className="border-none bg-accent has-data-[state=checked]:bg-green-600 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-600 dark:has-data-[state=checked]:text-white">
                                                    <Field orientation="horizontal">
                                                        <CreditCard size={18} />
                                                        <FieldTitle className="font-bold">Card</FieldTitle>
                                                        <RadioGroupItem value="CARD" id="card" className="hidden" />
                                                    </Field>
                                                </FieldLabel>
                                                <FieldLabel htmlFor="e-transfer" className="border-none bg-accent has-data-[state=checked]:bg-green-600 has-data-[state=checked]:text-white dark:has-data-[state=checked]:bg-green-600 dark:has-data-[state=checked]:text-white">
                                                    <Field orientation="horizontal">
                                                        <Landmark size={18} />
                                                        <FieldTitle className="font-bold">E-transfer</FieldTitle>
                                                        <RadioGroupItem value="E_TRANSFER" id="e-transfer" className="hidden" />
                                                    </Field>
                                                </FieldLabel>
                                            </RadioGroup>
                                        )} />
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 font-extrabold text-green-600">
                                    <span>Change</span>
                                    <span className="flex items-center justify-end"><SaudiRiyal size={15} />1500</span>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent className="py-4 space-y-4" value="PARTIAL">
                            <p className="text-muted-foreground">Partial payment is selected.</p>
                        </TabsContent>

                        <TabsContent className="py-4 space-y-4" value="NO_PAYMENT">
                            <p className="text-muted-foreground">No payment is selected.</p>
                        </TabsContent>
                    </Tabs>
                )} />
            <Button type="submit" onClick={onSubmit} className="py-6 bg-theme1 hover:bg-theme1/90 text-lg text-white w-full">
                Save and Proceed
                <Kbd className="border border-white text-white bg-transparent">Ctrl+Enter</Kbd>
            </Button>
        </div>
    )
}

export default Payment