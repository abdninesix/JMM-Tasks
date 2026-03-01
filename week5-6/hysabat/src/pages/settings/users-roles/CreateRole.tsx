import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Field, FieldTitle } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ArrowLeft, ChevronDown, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Permission = {
    id: string
    label: string
}

type Module = {
    id: string
    label: string
    permissions: Permission[]
}

const modules: Module[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        permissions: [
            { id: "overview", label: "Overview" },
            { id: "reports", label: "Reports" },
        ],
    },
    {
        id: "users",
        label: "Users",
        permissions: [
            { id: "create", label: "Create User" },
            { id: "edit", label: "Edit User" },
        ],
    },
]

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
                        <Textarea className="wrap-anywhere" placeholder="Enter description" />
                    </Field>

                    <Field>
                        <Label>Description (Arabic)</Label>
                        <Textarea className="wrap-anywhere" placeholder="Enter description" />
                    </Field>
                </div>

                {/* Access Management */}
                <div className="w-full lg:w-2/3 border rounded-md p-4">
                    <div className="flex flex-col md:flex-row justify-between">
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/2 font-bold">Module</TableHead>
                                <TableHead className="text-center font-bold">Read</TableHead>
                                <TableHead className="text-center font-bold">Write</TableHead>
                                <TableHead className="text-center font-bold">Delete</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {modules.map((module) => (
                                <Collapsible asChild>
                                    <>
                                        {/* Parent Row */}
                                        <TableRow>
                                            <TableCell>
                                                <CollapsibleTrigger className="flex items-center group text-theme1">
                                                    <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                                                    <span className="font-bold">{module.label}</span>
                                                </CollapsibleTrigger>
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Checkbox />
                                            </TableCell>
                                        </TableRow>

                                        {/* Children Rows */}
                                        <CollapsibleContent asChild>
                                            <>
                                                {module.permissions.map((perm) => (
                                                    <TableRow key={perm.id}>
                                                        <TableCell className="pl-8">
                                                            {perm.label}
                                                        </TableCell>

                                                        <TableCell className="text-center">
                                                            <Checkbox />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Checkbox />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Checkbox />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        </CollapsibleContent>
                                    </>
                                </Collapsible>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}

export default CreateRole