export default function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-3 rounded-lg border">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  )
}