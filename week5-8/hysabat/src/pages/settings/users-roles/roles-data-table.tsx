"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import type { Module } from "@/lib/types"

export type PermissionAction = "read" | "write" | "delete"

export type PermissionState = Record<
    string,
    Record<string, { read: boolean; write: boolean; delete: boolean }>
>

type Props = {
    modules: Module[]
    permissionsState: PermissionState
    toggleChild: (
        moduleId: string,
        permissionId: string,
        type: PermissionAction
    ) => void
    toggleParent: (
        moduleId: string,
        type: PermissionAction
    ) => void
}

export const DataTable = ({ modules, permissionsState, toggleChild, toggleParent }: Props) => {

    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})

    const toggleExpand = (moduleId: string) => {
        setExpandedModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }))
    }

    const actions: PermissionAction[] = ["read", "write", "delete"];

    return (
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
                {modules.map((module) => {
                    const children = permissionsState[module.id] ?? {}
                    const isExpanded = !!expandedModules[module.id]

                    return (
                        <React.Fragment key={module.id}>
                            {/* Parent Row */}
                            <TableRow>
                                <TableCell>
                                    <button
                                        type="button"
                                        onClick={() => toggleExpand(module.id)}
                                        className="flex items-center gap-2 text-theme1 font-bold outline-none"
                                    >
                                        <ChevronDown
                                            className={cn(
                                                "size-4 transition-transform duration-200",
                                                isExpanded ? "rotate-180" : "rotate-0"
                                            )}
                                        />
                                        {module.label}
                                    </button>
                                </TableCell>

                                {actions.map((type) => {
                                    const values = Object.values(children).map((p) => p[type])
                                    const allChecked = values.length > 0 && values.every(Boolean)
                                    const someChecked = values.some(Boolean)

                                    return (
                                        <TableCell key={type} className="text-center">
                                            <Checkbox
                                                checked={allChecked ? true : someChecked ? "indeterminate" : false}
                                                onCheckedChange={() => toggleParent(module.id, type)}
                                            />
                                        </TableCell>
                                    )
                                })}
                            </TableRow>

                            {/* Children Rows - Conditionally rendered based on state */}
                            {isExpanded && module.permissions.map((perm) => (
                                <TableRow key={perm.id} className="border-none">
                                    <TableCell className="pl-8 text-muted-foreground">
                                        {perm.label}
                                    </TableCell>

                                    {actions.map((type) => (
                                        <TableCell key={type} className="text-center">
                                            <Checkbox
                                                checked={permissionsState[module.id]?.[perm.id]?.[type] ?? false}
                                                onCheckedChange={() => toggleChild(module.id, perm.id, type)}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </React.Fragment>
                    )
                })}
            </TableBody>
        </Table>
    )
}