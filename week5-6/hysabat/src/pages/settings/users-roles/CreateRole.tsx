import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Field, FieldTitle } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, type PermissionState, type PermissionAction } from "./data-table";
import { modules } from "@/lib/data";

const CreateRole = () => {
    const navigate = useNavigate();
    const [permissionsState, setPermissionsState] = useState<PermissionState>({});

    useEffect(() => {
        const initial: PermissionState = {}
        modules.forEach((module) => {
            initial[module.id] = {}
            module.permissions.forEach((perm) => {
                initial[module.id][perm.id] = {
                    read: false,
                    write: false,
                    delete: false,
                }
            })
        })
        setPermissionsState(initial)
    }, [])

    const toggleChild = (
        moduleId: string,
        permissionId: string,
        type: PermissionAction
    ) => {
        setPermissionsState((prev) => ({
            ...prev,
            [moduleId]: {
                ...prev[moduleId],
                [permissionId]: {
                    ...prev[moduleId][permissionId],
                    [type]: !prev[moduleId][permissionId][type],
                },
            },
        }))
    }

    const toggleParent = (
        moduleId: string,
        type: PermissionAction
    ) => {
        setPermissionsState((prev) => {
            const children = prev[moduleId]
            if (!children) return prev

            const allChecked = Object.values(children).every((p) => p[type])

            const updated = Object.fromEntries(
                Object.entries(children).map(([permId, value]) => [
                    permId,
                    { ...value, [type]: !allChecked },
                ])
            )

            return {
                ...prev,
                [moduleId]: updated,
            }
        })
    }

    const handleGlobalSelect = (value: "ALL" | "NONE") => {
        const updated: PermissionState = {}
        modules.forEach((module) => {
            updated[module.id] = {}
            module.permissions.forEach((perm) => {
                updated[module.id][perm.id] = {
                    read: value === "ALL",
                    write: value === "ALL",
                    delete: value === "ALL",
                }
            })
        })
        setPermissionsState(updated)
    }

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
                        <RadioGroup onValueChange={(val) => handleGlobalSelect(val as any)} className="flex min-w-56">
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

                    <DataTable
                        modules={modules}
                        permissionsState={permissionsState}
                        toggleChild={toggleChild}
                        toggleParent={toggleParent}
                    />
                </div>
            </div>

        </div>
    )
}

export default CreateRole