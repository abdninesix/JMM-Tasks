import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Field, FieldTitle } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ArrowLeft, ChevronDownIcon, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateRole = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-card border rounded-md p-4 space-y-4">
            {/* Header Section */}
            <header className="space-y-4">
                <AppBreadcrumb items={[{ label: "Settings" }, { label: "Users & Roles", href: "/users-roles" }, { label: "Add New Role" }]} />
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-1 text-lg font-semibold"><ArrowLeft className="text-theme1" />Add New Role</h2>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate("/users-roles")} variant="outline">Cancel</Button>
                        <Button className='text-white bg-theme1 hover:bg-theme1/90'><Plus />Add</Button>
                    </div>
                </div>
            </header>

            <Separator />

            <div className="flex flex-col lg:flex-row gap-4 border rounded-md p-4">
                {/* Inputs */}
                <div className="w-full lg:w-1/3 border rounded-md p-4 space-y-4">
                    <Field>
                        <Label>Role name (English)</Label>
                        <InputGroup>
                            <InputGroupInput type='text' placeholder='Enter name in English' />
                            <InputGroupAddon>
                                <User className='size-6 text-gray-400' />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field>
                        <Label>Role name (Arabic)</Label>
                        <InputGroup>
                            <InputGroupInput type='text' placeholder='Enter name in Arabic' />
                            <InputGroupAddon>
                                <User className='size-6 text-gray-400' />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field>
                        <Label>Description (Arabic)</Label>
                        <Textarea placeholder="Enter description" />
                    </Field>

                    <Field>
                        <Label>Description (Arabic)</Label>
                        <Textarea placeholder="Enter description" />
                    </Field>
                </div>

                {/* Access Management */}
                <div className="w-full lg:w-2/3 border rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">Access Management</h3>
                        <RadioGroup className="flex min-w-56">
                            <Field orientation="horizontal">
                                <RadioGroupItem value="ALL" className="text-white" />
                                <FieldTitle>Select All</FieldTitle>
                            </Field>
                            <Field orientation="horizontal">
                                <RadioGroupItem value="NONE" className="text-white" />
                                <FieldTitle>Unselect All</FieldTitle>
                            </Field>
                        </RadioGroup>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="flex justify-between">
                                <th>Module</th>
                                <th>Read</th>
                                <th>Write</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Collapsible>
                                <>
                                    <tr className="flex justify-between">
                                        <td>
                                            <CollapsibleTrigger className="flex items-center gap-1 group text-theme1">
                                                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                                                <span className="font-bold">Dashboard</span>
                                            </CollapsibleTrigger>
                                        </td>
                                        <td><input type="checkbox" /></td>
                                        <td><input type="checkbox" /></td>
                                        <td><input type="checkbox" /></td>
                                    </tr>
                                    <CollapsibleContent>
                                        <>
                                            <tr className="flex justify-between">
                                                <td><span>Dashboard</span></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr className="flex justify-between">
                                                <td><span>Dashboard2</span></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                        </>
                                    </CollapsibleContent>
                                </>
                            </Collapsible>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default CreateRole