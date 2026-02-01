import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"

const Dashboard = () => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-theme1">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="flex gap-2 text-muted-foreground"><Calendar className="size-5" />{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())}</span>
          <Select defaultValue="dy">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value="dy">Today</SelectItem>
              <SelectItem value="wk">Last Week</SelectItem>
              <SelectItem value="mn">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <Separator className="mt-2" />
    </div>
  )
}

export default Dashboard