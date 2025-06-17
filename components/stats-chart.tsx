"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 300 },
  { name: "Jun", value: 200 },
  { name: "Jul", value: 500 },
  { name: "Aug", value: 300 },
  { name: "Sep", value: 400 },
  { name: "Oct", value: 500 },
  { name: "Nov", value: 450 },
  { name: "Dec", value: 500 },
]

export function StatsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="natural" dataKey="value" stroke="#ff6b00" strokeWidth={2} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
