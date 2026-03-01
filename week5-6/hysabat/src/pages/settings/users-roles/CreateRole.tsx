import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus } from "lucide-react";
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
                <div className="w-1/3 border rounded-md p-4">Hi</div>
                <div className="w-full border rounded-md p-4">Hi</div>
            </div>

        </div>
    )
}

export default CreateRole