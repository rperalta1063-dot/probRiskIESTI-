
export enum Iesticase {
  CASE_1 = '1',
  CASE_2A = '2a',
  CASE_2B = '2b',
  CASE_3 = '3'
}

export enum DistributionType {
  FIXED = 'fixed',
  NORMAL = 'normal',
  LOGNORMAL = 'lognormal',
  UNIFORM = 'uniform',
  TRIANGULAR = 'triangular',
  PERT = 'pert'
}

export interface DistributionParams {
  type: DistributionType;
  mean?: number;
  std?: number;
  min?: number;
  max?: number;
  mode?: number;
  sigma?: number;
}

export interface SimulationParams {
  mode: 'deterministic' | 'probabilistic';
  caseType: Iesticase;
  arfd: number;
  n_simulations: number;
  seed: number;
  lp_dist: DistributionParams;
  hr_dist: DistributionParams;
  bw_dist: DistributionParams;
  // Extra for case 2a/2b
  ue?: number;
  v?: number;
  stmr?: number;
}

export interface SimulationRecord {
  id: number;
  iesti: number;
  exceeds: boolean;
  lp: number;
  hr: number;
  bw: number;
}

export interface SimulationResult {
  data: SimulationRecord[];
  stats: {
    mean: number;
    median: number;
    p95: number;
    p99: number;
    probExceed: number;
    countExceed: number;
    ciLower: number;
    ciUpper: number;
  };
  correlations: {
    variable: string;
    value: number;
  }[];
}
