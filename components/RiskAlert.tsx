
import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

import { translations, Language } from '../src/translations';

interface RiskAlertProps {
  prob: number;
  lang: Language;
}

const RiskAlert: React.FC<RiskAlertProps> = ({ prob, lang }) => {
  const t = translations[lang];
  
  let config = {
    color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    title: t.lowRisk,
    icon: <CheckCircle className="w-8 h-8" />,
    desc: t.lowRiskDesc.replace('{prob}', prob.toFixed(2)),
    recommendations: t.recLow
  };

  if (prob > 20) {
    config = {
      color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      title: t.significantRisk,
      icon: <XCircle className="w-8 h-8" />,
      desc: t.significantRiskDesc.replace('{prob}', prob.toFixed(2)),
      recommendations: t.recSignificant
    };
  } else if (prob >= 5) {
    config = {
      color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      title: t.potentialRisk,
      icon: <AlertTriangle className="w-8 h-8" />,
      desc: t.potentialRiskDesc.replace('{prob}', prob.toFixed(2)),
      recommendations: t.recPotential
    };
  }

  return (
    <div className={`${config.color} border-l-4 p-6 rounded-r-xl my-6 flex gap-5`}>
      <div className="flex-shrink-0">{config.icon}</div>
      <div>
        <h3 className="font-bold text-lg mb-1">{config.title}</h3>
        <p className="mb-4 text-sm opacity-90">{config.desc}</p>
        <div className="text-sm">
          <span className="font-semibold block mb-2 uppercase text-[10px] tracking-widest">{t.recommendations}</span>
          <ul className="list-disc list-inside space-y-1 opacity-80">
            {config.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiskAlert;
