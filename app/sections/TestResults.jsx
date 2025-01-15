"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const TestResults = ({ title, status, amount, progress }) => {
  return (
    <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">12 test cases</p>
        </div>
        <div className="text-right">
          <div className="font-medium">{amount}</div>
          <p className="text-sm text-gray-500">on completion</p>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </CardContent>
  </Card>
  )
}

export default TestResults