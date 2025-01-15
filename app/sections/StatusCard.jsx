import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const StatusCard = ({ title, amount, status, progress }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{title}</span>
            <span className={`text-sm ${status === 'completed' ? 'text-green-500' : 'text-blue-500'}`}>
              {status === 'completed' ? '✓' : '•'}
            </span>
          </div>
          <div className="text-2xl font-semibold">{amount}</div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusCard