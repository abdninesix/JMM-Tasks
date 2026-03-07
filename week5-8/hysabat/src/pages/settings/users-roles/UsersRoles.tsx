import { AppBreadcrumb } from "@/components/AppBreadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const UsersRoles = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-card border rounded-md p-4 space-y-4">
            {/* Header Section */}
            <header className="space-y-2">
                <AppBreadcrumb items={[{ label: "Settings" }, { label: "Users & Roles" }]} />
                <div>
                    <h1 className="text-2xl font-semibold text-theme1">Users & Roles Management</h1>
                    <p>Manage system users and role persmissions.</p>
                    <Button onClick={() => navigate("/users-roles/create-role")} className='text-white bg-theme1 hover:bg-theme1/90'>
                        Create role
                    </Button>
                </div>
            </header>

            <Separator />

        </div>
    )
}

export default UsersRoles