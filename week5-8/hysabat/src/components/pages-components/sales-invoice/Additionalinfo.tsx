import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { BookText, ChevronDown, FileIcon } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"
import ReactQuill from "react-quill-new"
import type { InvoiceFormValues } from "./InvoiceSchema"

const modules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ],
};

const Additionalinfo = ({ form }: { form: UseFormReturn<InvoiceFormValues> }) => {

    const { control } = form;

    return (
        <div className="lg:w-3/5 h-fit space-y-4 p-4 bg-card border rounded-md">
            <h2 className="font-semibold">Additional Information</h2>
            <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-1 w-full group text-theme1">
                    <FileIcon className="size-5" />
                    <span className="font-semibold">Notes</span>
                    <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                    <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Type and hit enter..."
                                className="[&_.ql-editor]:min-h-30 [&_.ql-editor]:max-w-md"
                            />
                        )} />
                </CollapsibleContent>
            </Collapsible>
            <Separator />
            <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-1 w-full group text-theme1">
                    <BookText className="size-5" />
                    <span className="font-semibold">Terms & Conditions</span>
                    <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                    <Controller
                        name="termsAndConditions"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Type and hit enter..."
                                className="[&_.ql-editor]:min-h-30 [&_.ql-editor]:max-w-md"
                            />
                        )} />
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export default Additionalinfo