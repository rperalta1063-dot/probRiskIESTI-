
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit: string;
  subtext?: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, unit, subtext, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
        {icon && <div className="text-indigo-500 dark:text-indigo-400 opacity-80">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{unit}</span>
      </div>
      {subtext && <p className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">{subtext}</p>}
    </div>
  );
};

export default StatsCard;
