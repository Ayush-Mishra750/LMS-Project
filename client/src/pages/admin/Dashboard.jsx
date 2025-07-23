import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=' grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '> 
    <Card className="w-full max-w-[600px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-2xl p-6">
  <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-xl font-semibold">Total Sales</CardTitle>
  </CardHeader>
</Card>
    </div>
  )
}

export default Dashboard
