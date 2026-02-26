import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {trend && (
        <div
          className={`mt-4 flex items-center text-sm ${trendUp ? "text-green-600" : "text-red-600"}`}
        >
          <span className="font-medium">{trend}</span>
          <span className="text-slate-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}
