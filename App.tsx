
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Settings, 
  Play, 
  BarChart3, 
  TrendingUp, 
  Box, 
  Table, 
  Download, 
  Info,
  Activity,
  Zap,
  AlertTriangle,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  Utensils,
  Users,
  Layers,
  ShieldCheck,
  MousePointer2,
  Calculator,
  Image as ImageIcon,
  Sun,
  Moon
} from 'lucide-react';
import { 
  Iesticase, 
  DistributionType, 
  SimulationParams, 
  SimulationResult,
  DistributionParams
} from './types';
import { runMonteCarlo } from './services/simulationEngine';
import { PESTICIDE_LIST, Pesticide } from './services/pesticideData';
import { FOOD_LIST, Food } from './services/foodData';
import StatsCard from './components/StatsCard';
import RiskAlert from './components/RiskAlert';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { translations, Language } from './src/translations';

declare const Plotly: any;

interface VariableInputProps {
  label: string;
  params: DistributionParams;
  onChange: (newParams: DistributionParams) => void;
  t: any;
}

const VariableInput: React.FC<VariableInputProps> = ({ label, params, onChange, t }) => {
  const updateParam = (key: keyof DistributionParams, value: any) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <section className="bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{label}</label>
        <select 
          className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 px-2 py-1 rounded-md outline-none cursor-pointer"
          value={params.type}
          onChange={(e) => updateParam('type', e.target.value as DistributionType)}
        >
          <option value={DistributionType.FIXED}>{t.fixed}</option>
          <option value={DistributionType.NORMAL}>{t.normal}</option>
          <option value={DistributionType.LOGNORMAL}>{t.lognormal}</option>
          <option value={DistributionType.UNIFORM}>{t.uniform}</option>
          <option value={DistributionType.TRIANGULAR}>{t.triangular}</option>
          <option value={DistributionType.PERT}>{t.pert}</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {params.type === DistributionType.FIXED && (
          <div className="space-y-1 col-span-2">
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.fixedValue}</span>
            <input 
              type="number" step="any"
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all font-mono dark:text-slate-200"
              value={params.mean ?? ''}
              onChange={(e) => updateParam('mean', parseFloat(e.target.value))}
            />
          </div>
        )}

        {(params.type === DistributionType.NORMAL || params.type === DistributionType.LOGNORMAL) && (
          <>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.mean}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.mean ?? ''}
                onChange={(e) => updateParam('mean', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">
                {params.type === DistributionType.LOGNORMAL ? t.sigma : t.stdDev}
              </span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.type === DistributionType.LOGNORMAL ? (params.sigma ?? '') : (params.std ?? '')}
                onChange={(e) => updateParam(params.type === DistributionType.LOGNORMAL ? 'sigma' : 'std', parseFloat(e.target.value))}
              />
            </div>
          </>
        )}

        {params.type === DistributionType.UNIFORM && (
          <>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.min}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.min ?? ''}
                onChange={(e) => updateParam('min', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.max}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.max ?? ''}
                onChange={(e) => updateParam('max', parseFloat(e.target.value))}
              />
            </div>
          </>
        )}

        {(params.type === DistributionType.TRIANGULAR || params.type === DistributionType.PERT) && (
          <>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.min}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.min ?? ''}
                onChange={(e) => updateParam('min', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.max}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.max ?? ''}
                onChange={(e) => updateParam('max', parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-1 col-span-2">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase ml-1">{t.mode}</span>
              <input 
                type="number" step="any"
                className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 outline-none transition-all dark:text-slate-200"
                value={params.mode ?? ''}
                onChange={(e) => updateParam('mode', parseFloat(e.target.value))}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const t = translations[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [params, setParams] = useState<SimulationParams>({
    mode: 'probabilistic',
    caseType: Iesticase.CASE_1,
    arfd: 0.02,
    n_simulations: 100000,
    seed: 42,
    lp_dist: { type: DistributionType.LOGNORMAL, mean: 300, sigma: 0.3, min: 100, max: 1000, mode: 300, std: 50 },
    hr_dist: { type: DistributionType.LOGNORMAL, mean: 0.5, sigma: 0.2, min: 0.1, max: 2, mode: 0.5, std: 0.1 },
    bw_dist: { type: DistributionType.NORMAL, mean: 70, std: 10, min: 40, max: 120, mode: 70 },
    ue: 100,
    v: 3,
    stmr: 0.25
  });

  const [selectedPesticide, setSelectedPesticide] = useState<string>('manual');
  const [selectedFood, setSelectedFood] = useState<string>('manual');
  const [population, setPopulation] = useState<'adult' | 'child'>('adult');
  
  const [showPesticideDetails, setShowPesticideDetails] = useState<boolean>(true);
  const [showFoodDetails, setShowFoodDetails] = useState<boolean>(true);
  
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'histogram' | 'cdf' | 'boxplot' | 'sensitivity' | 'data'>('histogram');

  const histogramRef = useRef<HTMLDivElement>(null);
  const cdfRef = useRef<HTMLDivElement>(null);
  const boxplotRef = useRef<HTMLDivElement>(null);
  const tornadoRef = useRef<HTMLDivElement>(null);

  const currentPesticideObj = PESTICIDE_LIST.find(p => p.name === selectedPesticide);
  const currentFoodObj = FOOD_LIST.find(f => f.name === selectedFood);

  // Sync LP when food or population changes
  useEffect(() => {
    if (selectedFood !== 'manual') {
      const food = FOOD_LIST.find(f => f.name === selectedFood);
      if (food) {
        const lpValue = population === 'child' ? food.lp_child : food.lp_adult;
        setParams(prev => ({ 
          ...prev, 
          lp_dist: { ...prev.lp_dist, mean: lpValue, mode: lpValue },
          ue: food.ue
        }));
      }
    }
  }, [selectedFood, population]);

  // Sync ARfD when pesticide changes
  useEffect(() => {
    if (selectedPesticide !== 'manual') {
      const pest = PESTICIDE_LIST.find(p => p.name === selectedPesticide);
      if (pest) {
        setParams(prev => ({ ...prev, arfd: pest.arfd }));
      }
    }
  }, [selectedPesticide]);

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => {
      const res = runMonteCarlo(params);
      setResults(res);
      setLoading(false);
    }, 500);
  };

  const handleExportCSV = () => {
    if (!results) return;

    const headers = ['ID', 'LP (g)', 'HR (mg/kg)', 'bw (kg)', 'IESTI (mg/kg)', 'ARfD %'];
    const rows = results.data.map(r => [
      r.id,
      r.lp.toFixed(6),
      r.hr.toFixed(6),
      r.bw.toFixed(6),
      r.iesti.toFixed(10),
      ((r.iesti / params.arfd) * 100).toFixed(4)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `simulacion_iesti_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = async () => {
    if (!results) return;

    // Initialize jsPDF with compression enabled
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    // Title
    doc.setFontSize(18);
    doc.text(t.reportTitle, 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`${t.date}: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`${t.substance}: ${selectedPesticide === 'manual' ? t.manualEntry : selectedPesticide}`, 14, 37);
    doc.text(`${t.food}: ${selectedFood === 'manual' ? t.manualEntry : selectedFood}`, 14, 44);
    doc.text(`${t.population}: ${population === 'adult' ? t.adults : t.children}`, 14, 51);
    doc.text(`${t.method}: ${params.mode === 'deterministic' ? t.deterministic : t.probabilistic}`, 14, 58);

    // Stats
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(t.statsSummary, 14, 70);
    
    const stats = [
      [t.meanIesti, `${results.stats.mean.toFixed(6)} mg/kg`],
      [t.p95, `${results.stats.p95.toFixed(6)} mg/kg`],
      [t.p99, `${results.stats.p99.toFixed(6)} mg/kg`],
      [t.probExceed, `${results.stats.probExceed.toFixed(2)}%`],
      [t.toxicity, `${params.arfd} mg/kg`]
    ];

    autoTable(doc, {
      startY: 75,
      head: [[t.parameter, t.value]],
      body: stats,
      theme: 'striped',
      headStyles: { fillColor: [99, 102, 241] }
    });

    let lastY = (doc as any).lastAutoTable.finalY + 15;

    // Add Chart if not in data tab
    if (activeTab !== 'data') {
      let ref;
      if (activeTab === 'histogram') ref = histogramRef.current;
      else if (activeTab === 'cdf') ref = cdfRef.current;
      else if (activeTab === 'boxplot') ref = boxplotRef.current;
      else if (activeTab === 'sensitivity') ref = tornadoRef.current;

      if (ref) {
        try {
          // Use JPEG for smaller PDF size, with higher resolution for clarity
          const imgData = await Plotly.toImage(ref, { 
            format: 'jpeg', 
            width: 1200, 
            height: 750 
          });
          doc.setFontSize(14);
          doc.text(`${t.chart}: ${t[activeTab as keyof typeof t] || activeTab.toUpperCase()}`, 14, lastY);
          // Use 'FAST' compression for the image
          doc.addImage(imgData, 'JPEG', 15, lastY + 5, 180, 110, undefined, 'FAST');
          lastY += 130;
        } catch (error) {
          console.error("Error adding chart to PDF:", error);
        }
      }
    }

    // Data Table
    if (lastY > 240) {
      doc.addPage();
      lastY = 20;
    }

    doc.setFontSize(14);
    doc.text(t.iterationDetail, 14, lastY);

    const tableData = results.data.slice(0, 100).map(r => [
      r.id,
      r.lp.toFixed(4),
      r.hr.toFixed(4),
      r.bw.toFixed(2),
      r.iesti.toFixed(8),
      `${((r.iesti / params.arfd) * 100).toFixed(2)}%`
    ]);

    autoTable(doc, {
      startY: lastY + 5,
      head: [[t.id, t.lp, t.hr, t.bw, t.iesti, t.arfdPercent]],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [99, 102, 241] },
      styles: { fontSize: 8 }
    });

    doc.save(`reporte_iesti_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportChart = async () => {
    if (!results || activeTab === 'data') return;
    
    let ref;
    if (activeTab === 'histogram') ref = histogramRef.current;
    else if (activeTab === 'cdf') ref = cdfRef.current;
    else if (activeTab === 'boxplot') ref = boxplotRef.current;
    else if (activeTab === 'sensitivity') ref = tornadoRef.current;
    
    if (ref) {
      try {
        await Plotly.downloadImage(ref, {
          format: 'png',
          width: 1200,
          height: 800,
          filename: `grafico_iesti_${activeTab}_${new Date().toISOString().split('T')[0]}`
        });
      } catch (error) {
        console.error("Error exporting chart:", error);
      }
    }
  };

  useEffect(() => {
    if (results && !loading) {
      renderCharts();
    }
  }, [results, activeTab, loading]);

  const renderCharts = () => {
    if (!results) return;
    const data = results.data.map(d => d.iesti);
    const layoutBase = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 30, r: 30, b: 50, l: 60 },
      font: { family: 'Inter, sans-serif' },
      xaxis: { gridcolor: '#f1f5f9', zeroline: false },
      yaxis: { gridcolor: '#f1f5f9', zeroline: false }
    };

    if (activeTab === 'histogram' && histogramRef.current) {
      Plotly.newPlot(histogramRef.current, [{
        x: data,
        type: 'histogram',
        nbinsx: 50,
        marker: { color: 'rgba(99, 102, 241, 0.7)', line: { color: 'rgb(99, 102, 241)', width: 1 } },
        name: 'Distribución IESTI'
      }, {
        x: [params.arfd, params.arfd],
        y: [0, 1],
        type: 'scatter',
        mode: 'lines',
        line: { color: '#ef4444', width: 3, dash: 'dash' },
        name: 'ARfD',
        yaxis: 'y2'
      }], {
        ...layoutBase,
        title: 'Histograma de IESTI',
        xaxis: { title: 'IESTI (mg/kg bw)', ...layoutBase.xaxis },
        yaxis: { title: 'Frecuencia', ...layoutBase.yaxis },
        yaxis2: { overlaying: 'y', side: 'right', showgrid: false, zeroline: false, showticklabels: false },
        showlegend: false
      }, { responsive: true });
    }

    if (activeTab === 'cdf' && cdfRef.current) {
      const sorted = [...data].sort((a, b) => a - b);
      const p = sorted.map((_, i) => i / sorted.length);
      Plotly.newPlot(cdfRef.current, [{
        x: sorted,
        y: p,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#6366f1', width: 3 },
        fill: 'tozeroy',
        fillcolor: 'rgba(99, 102, 241, 0.1)'
      }, {
        x: [params.arfd, params.arfd],
        y: [0, 1],
        type: 'scatter',
        mode: 'lines',
        line: { color: '#ef4444', width: 2, dash: 'dash' },
        name: 'ARfD'
      }], {
        ...layoutBase,
        title: 'Probabilidad Acumulada (CDF)',
        xaxis: { title: 'IESTI (mg/kg bw)', ...layoutBase.xaxis },
        yaxis: { title: 'Probabilidad', range: [0, 1.05], ...layoutBase.yaxis }
      }, { responsive: true });
    }

    if (activeTab === 'boxplot' && boxplotRef.current) {
      Plotly.newPlot(boxplotRef.current, [{
        y: data,
        type: 'box',
        name: 'Simulación',
        marker: { color: '#6366f1' },
        boxpoints: 'suspectedoutliers'
      }], {
        ...layoutBase,
        title: 'Boxplot de Resultados',
        yaxis: { title: 'IESTI (mg/kg bw)', ...layoutBase.yaxis }
      }, { responsive: true });
    }

    if (activeTab === 'sensitivity' && tornadoRef.current) {
      const corr = results.correlations;
      Plotly.newPlot(tornadoRef.current, [{
        y: corr.map(c => c.variable),
        x: corr.map(c => c.value),
        type: 'bar',
        orientation: 'h',
        marker: {
          color: corr.map(c => c.value > 0 ? '#6366f1' : '#f43f5e')
        }
      }], {
        ...layoutBase,
        title: 'Análisis de Sensibilidad (Correlación)',
        xaxis: { title: 'Coeficiente de Correlación', range: [-1, 1], ...layoutBase.xaxis },
        yaxis: { ...layoutBase.yaxis }
      }, { responsive: true });
    }
  };

  const setGlobalDeterministic = () => {
    setParams(prev => ({
      ...prev,
      mode: 'deterministic',
      n_simulations: 1,
      lp_dist: { ...prev.lp_dist, type: DistributionType.FIXED },
      hr_dist: { ...prev.hr_dist, type: DistributionType.FIXED },
      bw_dist: { ...prev.bw_dist, type: DistributionType.FIXED }
    }));
  };

  const setGlobalProbabilistic = () => {
    setParams(prev => ({
      ...prev,
      mode: 'probabilistic',
      n_simulations: 100000,
      lp_dist: { ...prev.lp_dist, type: DistributionType.LOGNORMAL },
      hr_dist: { ...prev.hr_dist, type: DistributionType.LOGNORMAL },
      bw_dist: { ...prev.bw_dist, type: DistributionType.NORMAL }
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
              <FlaskConical className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">{t.title} <span className="text-indigo-600 dark:text-indigo-400">IESTI</span></h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-2">
              <button onClick={() => setLanguage('es')} className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'es' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>ES</button>
              <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'fr' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>FR</button>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={handleRun}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {loading ? t.simulating : t.startSimulation}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Sidebar - Config */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* General Settings */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-400" />
                  <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.globalConfig}</h2>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">{t.evalMethod}</label>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={setGlobalDeterministic}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold rounded-lg transition-all ${params.mode === 'deterministic' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      <MousePointer2 className="w-3 h-3" />
                      {t.deterministic}
                    </button>
                    <button 
                      onClick={setGlobalProbabilistic}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold rounded-lg transition-all ${params.mode === 'probabilistic' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      <Calculator className="w-3 h-3" />
                      {t.probabilistic}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">{t.simulations}</label>
                    <input 
                      type="number"
                      disabled={params.mode === 'deterministic'}
                      className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-300 dark:focus:border-indigo-500 transition-all dark:text-slate-200 ${params.mode === 'deterministic' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      value={params.n_simulations}
                      onChange={(e) => setParams({ ...params, n_simulations: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">{t.population}</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      <button 
                        onClick={() => setPopulation('adult')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${population === 'adult' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                      >{t.adults}</button>
                      <button 
                        onClick={() => setPopulation('child')}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${population === 'child' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                      >{t.children}</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">{t.calcModel}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: Iesticase.CASE_1, label: t.case1, desc: t.case1Desc },
                      { id: Iesticase.CASE_2A, label: t.case2a, desc: t.case2aDesc },
                      { id: Iesticase.CASE_2B, label: t.case2b, desc: t.case2bDesc },
                      { id: Iesticase.CASE_3, label: t.case3, desc: t.case3Desc }
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={() => setParams({ ...params, caseType: c.id })}
                        className={`p-2 rounded-xl border text-center transition-all ${params.caseType === c.id ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'}`}
                      >
                        <div className="text-[10px] font-bold uppercase">{c.label}</div>
                        <div className="text-[8px] opacity-60 font-medium">{c.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pesticide Input */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setShowPesticideDetails(!showPesticideDetails)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-t-2xl"
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-5 h-5 text-indigo-500" />
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.activeSubstance}</h2>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t.toxicity}</p>
                  </div>
                </div>
                {showPesticideDetails ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
              </button>
              
              {showPesticideDetails && (
                <div className="p-5 pt-0 space-y-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="pt-4 space-y-3">
                    <select 
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:border-indigo-300 dark:focus:border-indigo-500 dark:text-slate-200"
                      value={selectedPesticide}
                      onChange={(e) => setSelectedPesticide(e.target.value)}
                    >
                      <option value="manual">{t.manualEntry}</option>
                      {PESTICIDE_LIST.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{t.arfdLabel}</span>
                        <input 
                          type="number" step="any"
                          className="w-24 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-right text-sm font-bold text-indigo-600 dark:text-indigo-400 outline-none font-mono"
                          value={params.arfd}
                          onChange={(e) => setParams({ ...params, arfd: parseFloat(e.target.value) })}
                        />
                      </div>
                      {currentPesticideObj && (
                        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700 space-y-1">
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
                            <span className="text-slate-400 dark:text-slate-500">{t.source}:</span>
                            <span className="text-slate-600 dark:text-slate-400">{currentPesticideObj.source}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed italic">{currentPesticideObj.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Food Input */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setShowFoodDetails(!showFoodDetails)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-t-2xl"
              >
                <div className="flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-indigo-500" />
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.foodConsumption}</h2>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t.lpUnit}</p>
                  </div>
                </div>
                {showFoodDetails ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
              </button>

              {showFoodDetails && (
                <div className="p-5 pt-0 space-y-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="pt-4 space-y-4">
                    <select 
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:border-indigo-300 dark:focus:border-indigo-500 dark:text-slate-200"
                      value={selectedFood}
                      onChange={(e) => setSelectedFood(e.target.value)}
                    >
                      <option value="manual">{t.manualEntry}</option>
                      {FOOD_LIST.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                    </select>

                    <VariableInput 
                      label={t.consumptionLP} 
                      params={params.lp_dist}
                      onChange={(lp) => setParams({ ...params, lp_dist: lp })}
                      t={t}
                    />

                    {params.caseType !== Iesticase.CASE_1 && (
                      <div className="space-y-3 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900 rounded-xl">
                        <h3 className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">{t.case2Params}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] text-indigo-400 dark:text-indigo-500 font-bold uppercase">{t.ueLabel}</span>
                            <input 
                              type="number"
                              className="w-full p-2 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 rounded-lg text-sm outline-none font-mono dark:text-slate-200"
                              value={params.ue}
                              onChange={(e) => setParams({ ...params, ue: parseFloat(e.target.value) })}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] text-indigo-400 dark:text-indigo-500 font-bold uppercase">{t.vFactor}</span>
                            <input 
                              type="number"
                              className="w-full p-2 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 rounded-lg text-sm outline-none font-mono dark:text-slate-200"
                              value={params.v}
                              onChange={(e) => setParams({ ...params, v: parseFloat(e.target.value) })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Residue & BW */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-6">
              <VariableInput 
                label={params.caseType === Iesticase.CASE_3 ? t.residueSTMRP : t.residueHR} 
                params={params.hr_dist}
                onChange={(hr) => setParams({ ...params, hr_dist: hr })}
                t={t}
              />
              <VariableInput 
                label={t.bodyWeight} 
                params={params.bw_dist}
                onChange={(bw) => setParams({ ...params, bw_dist: bw })}
                t={t}
              />
            </div>
          </div>

          {/* Main Content - Results */}
          <div className="col-span-12 lg:col-span-8">
            {!results && !loading ? (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-10 h-10 text-slate-200 dark:text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{t.readyForAnalysis}</h3>
                <p className="text-slate-400 dark:text-slate-500 max-w-sm mb-8">{t.adjustParams}</p>
                <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <MousePointer2 className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">{t.punctual}</span>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <Calculator className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">{t.calculated}</span>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">{t.certified}</span>
                  </div>
                </div>
              </div>
            ) : loading ? (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-indigo-100 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FlaskConical className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <p className="mt-8 text-lg font-bold text-slate-700 dark:text-slate-300">{t.processing} {params.mode === 'deterministic' ? t.punctual.toLowerCase() : `${t.calculated.toLowerCase()} ${params.n_simulations.toLocaleString()} ${t.iterations}`}...</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">{t.applyingFormula} {params.caseType === '1' ? t.case1 : `${t.case1.split(' ')[0]} ${params.caseType}`}.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatsCard label={params.mode === 'deterministic' ? t.iestiPunctual : t.meanIesti} value={results!.stats.mean.toFixed(5)} unit="mg/kg" icon={<TrendingUp className="w-4 h-4" />} />
                  <StatsCard label={t.p95} value={results!.stats.p95.toFixed(5)} unit="mg/kg" icon={<BarChart3 className="w-4 h-4" />} />
                  <StatsCard label={t.p99} value={results!.stats.p99.toFixed(5)} unit="mg/kg" icon={<Activity className="w-4 h-4" />} />
                  <StatsCard label={t.probExceed} value={results!.stats.probExceed.toFixed(2)} unit="%" icon={<AlertTriangle className="w-4 h-4" />} />
                </div>

                {/* Risk Evaluation */}
                <RiskAlert prob={results!.stats.probExceed} lang={language} />

                {/* Main Visualizations */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                      {[
                        { id: 'histogram', icon: <BarChart3 className="w-3.5 h-3.5" />, label: t.histogram },
                        { id: 'cdf', icon: <TrendingUp className="w-3.5 h-3.5" />, label: t.cdf },
                        { id: 'boxplot', icon: <Box className="w-3.5 h-3.5" />, label: t.boxplot },
                        { id: 'sensitivity', icon: <Layers className="w-3.5 h-3.5" />, label: t.sensitivity },
                        { id: 'data', icon: <Table className="w-3.5 h-3.5" />, label: t.data }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          disabled={params.mode === 'deterministic' && (tab.id === 'histogram' || tab.id === 'cdf' || tab.id === 'boxplot' || tab.id === 'sensitivity')}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-indigo-900/20' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'} ${params.mode === 'deterministic' && (tab.id !== 'data') ? 'opacity-30 cursor-not-allowed' : ''}`}
                        >
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={handleExportCSV}
                      className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> {t.exportCSV}
                    </button>
                    <button 
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> {t.exportPDF}
                    </button>
                    {activeTab !== 'data' && (
                      <button 
                        onClick={handleExportChart}
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5" /> {t.exportChart}
                      </button>
                    )}
                  </div>

                  <div className="p-6">
                    {params.mode === 'deterministic' && activeTab !== 'data' ? (
                      <div className="h-[450px] flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                          <MousePointer2 className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">{t.restrictedView}</p>
                          <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs mx-auto">{t.restrictedViewDesc}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {activeTab === 'histogram' && <div ref={histogramRef} className="h-[450px] w-full" />}
                        {activeTab === 'cdf' && <div ref={cdfRef} className="h-[450px] w-full" />}
                        {activeTab === 'boxplot' && <div ref={boxplotRef} className="h-[450px] w-full" />}
                        {activeTab === 'sensitivity' && <div ref={tornadoRef} className="h-[450px] w-full" />}
                        
                        {activeTab === 'data' && (
                          <div className="overflow-auto max-h-[450px] rounded-xl border border-slate-100 dark:border-slate-800">
                            <table className="w-full text-left border-collapse">
                              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                  <th className="px-4 py-3">ID</th>
                                  <th className="px-4 py-3">{t.lpLabel} (g)</th>
                                  <th className="px-4 py-3">{params.caseType === Iesticase.CASE_3 ? 'STMR-P' : t.hrLabel} (mg/kg)</th>
                                  <th className="px-4 py-3">{t.bwLabel} (kg)</th>
                                  <th className="px-4 py-3">{t.iestiLabel} (mg/kg)</th>
                                  <th className="px-4 py-3 text-right">ARfD %</th>
                                </tr>
                              </thead>
                              <tbody className="text-sm divide-y divide-slate-50 dark:divide-slate-800 font-medium text-slate-600 dark:text-slate-400 font-mono">
                                {results!.data.slice(0, 50).map((r, i) => (
                                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-4 py-2.5 text-slate-400 dark:text-slate-600 text-xs">#{r.id}</td>
                                    <td className="px-4 py-2.5">{r.lp.toFixed(2)}</td>
                                    <td className="px-4 py-2.5">{r.hr.toFixed(3)}</td>
                                    <td className="px-4 py-2.5">{r.bw.toFixed(1)}</td>
                                    <td className="px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200">{r.iesti.toFixed(6)}</td>
                                    <td className={`px-4 py-2.5 text-right font-bold ${r.exceeds ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
                                      {((r.iesti / params.arfd) * 100).toFixed(1)}%
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="p-4 text-center bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-medium italic border-t border-slate-100 dark:border-slate-700">
                              {params.mode === 'deterministic' ? t.singleRecord : `${t.showingFirst} 50 ${t.of} ${results!.data.length.toLocaleString()} ${t.iterations.toLowerCase()}.`}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">{t.resultsAnalysis}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-400 dark:text-slate-500">{t.groupMean}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-mono">{results!.stats.mean.toFixed(6)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-indigo-600 dark:bg-indigo-500" style={{ width: `${Math.min(100, (results!.stats.mean / params.arfd) * 100)}%` }}></div>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">{t.meanChartDesc}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">{t.methodNote}</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t.methodNoteDesc}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-60 dark:opacity-40">
            <div className="w-8 h-8 bg-slate-800 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <FlaskConical className="text-white w-5 h-5" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-800 dark:text-slate-200">ProbRisk IESTI v2.5</span>
          </div>
          <div className="flex gap-8">
            <a 
              href="https://www.fao.org/3/y4544e/y4544e0j.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest transition-colors"
            >
              {t.documentation}
            </a>
            <a 
              href="https://www.fao.org/food-safety/scientific-advice/jmpr/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest transition-colors"
            >
              {t.jmprRegulation}
            </a>
            <a href="#" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest transition-colors">{t.support}</a>
          </div>
          <p className="text-[10px] font-medium text-slate-300 dark:text-slate-600">{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
