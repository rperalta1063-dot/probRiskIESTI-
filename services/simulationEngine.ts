
import { SimulationParams, SimulationResult, SimulationRecord, Iesticase } from '../types';
import { sampleDistribution, calculateCorrelation } from './mathUtils';

export const runMonteCarlo = (params: SimulationParams): SimulationResult => {
  const records: SimulationRecord[] = [];
  const n = params.mode === 'deterministic' ? 1 : params.n_simulations;

  for (let i = 0; i < n; i++) {
    const lp = Math.max(0.1, sampleDistribution(params.lp_dist));
    const hr = Math.max(0, sampleDistribution(params.hr_dist));
    const bw = Math.max(5, sampleDistribution(params.bw_dist));

    let iesti = 0;
    switch (params.caseType) {
      case Iesticase.CASE_1:
        iesti = (lp * hr) / bw;
        break;
      case Iesticase.CASE_2A:
        // Caso 2a: Unidades mezcladas
        const ue = params.ue || 100; // unit weight
        const v = params.v || 3;     // variability factor
        const stmr = params.stmr || (hr * 0.5);
        iesti = ((ue * hr * v) + (lp - ue) * stmr) / bw;
        break;
      case Iesticase.CASE_2B:
        // Caso 2b: Alta variabilidad
        const v2b = params.v || 3;
        iesti = (lp * hr * v2b) / bw;
        break;
      case Iesticase.CASE_3:
        // Caso 3: Bulked or blended
        iesti = (lp * hr) / bw;
        break;
    }

    // Convert gram LP to kg to match HR (mg/kg) / bw (kg)
    // Actually the standard formula: LP is in kg/day or g/day? 
    // Typically LP is g/day, HR is mg/kg, bw is kg.
    // Result = (g * mg/kg) / kg = (g/kg * mg) / kg = (unitless * mg) / kg = mg/kg bw.
    // Correct logic: ( (LP_in_g / 1000) * HR_in_mg_kg ) / bw_in_kg
    iesti = iesti / 1000;

    records.push({
      id: i + 1,
      iesti,
      exceeds: iesti > params.arfd,
      lp,
      hr,
      bw
    });
  }

  // Calculate stats
  const iestiValues = records.map(r => r.iesti);
  const sortedValues = [...iestiValues].sort((a, b) => a - b);
  const countExceed = records.filter(r => r.exceeds).length;

  const stats = {
    mean: iestiValues.reduce((a, b) => a + b, 0) / n,
    median: sortedValues[Math.floor(n / 2)],
    p95: sortedValues[Math.floor(n * 0.95)],
    p99: sortedValues[Math.floor(n * 0.99)],
    probExceed: (countExceed / n) * 100,
    countExceed,
    ciLower: sortedValues[Math.floor(n * 0.025)],
    ciUpper: sortedValues[Math.floor(n * 0.975)]
  };

  // Sensitivity (Simple correlations)
  const correlations = [
    { variable: 'HR', value: calculateCorrelation(records.map(r => r.hr), iestiValues) },
    { variable: 'LP', value: calculateCorrelation(records.map(r => r.lp), iestiValues) },
    { variable: 'bw', value: calculateCorrelation(records.map(r => r.bw), iestiValues) }
  ];

  return {
    data: records,
    stats,
    correlations
  };
};
