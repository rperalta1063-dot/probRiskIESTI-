
import { DistributionType, DistributionParams } from '../types';

/**
 * Box-Muller transform for Normal distribution
 */
export const randomNormal = (mean: number, std: number): number => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + std * num;
};

/**
 * Lognormal distribution
 */
export const randomLogNormal = (mean: number, sigma: number): number => {
  const mu = Math.log(mean) - 0.5 * sigma * sigma;
  return Math.exp(randomNormal(mu, sigma));
};

/**
 * Triangular distribution
 */
export const randomTriangular = (min: number, max: number, mode: number): number => {
  const u = Math.random();
  const f = (mode - min) / (max - min);
  if (u < f) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  } else {
    return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }
};

/**
 * Uniform distribution
 */
export const randomUniform = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

/**
 * Simplified Gamma for Beta sampling
 */
const randomGamma = (alpha: number, beta: number): number => {
  let d, c, x, v, u;
  if (alpha < 1) {
    return randomGamma(alpha + 1, beta) * Math.pow(Math.random(), 1 / alpha);
  }
  d = alpha - 1 / 3;
  c = 1 / Math.sqrt(9 * d);
  while (true) {
    do {
      x = randomNormal(0, 1);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v * beta;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v * beta;
  }
};

/**
 * Beta distribution
 */
export const randomBeta = (alpha: number, beta: number): number => {
  const x = randomGamma(alpha, 1);
  const y = randomGamma(beta, 1);
  return x / (x + y);
};

/**
 * PERT distribution (Simplified Beta-PERT)
 */
export const randomPERT = (min: number, max: number, mode: number, lambda: number = 4): number => {
  const alpha = 1 + lambda * (mode - min) / (max - min);
  const beta = 1 + lambda * (max - mode) / (max - min);
  return min + randomBeta(alpha, beta) * (max - min);
};

/**
 * Sample from distribution based on parameters
 */
export const sampleDistribution = (params: DistributionParams): number => {
  const { type, mean = 0, std = 1, min = 0, max = 1, mode = 0.5, sigma = 0.1 } = params;
  
  switch (type) {
    case DistributionType.FIXED:
      return mean;
    case DistributionType.NORMAL:
      return randomNormal(mean, std);
    case DistributionType.LOGNORMAL:
      return randomLogNormal(mean, sigma);
    case DistributionType.TRIANGULAR:
      return randomTriangular(min, max, mode);
    case DistributionType.UNIFORM:
      return randomUniform(min, max);
    case DistributionType.PERT:
      return randomPERT(min, max, mode);
    default:
      return 0;
  }
};

/**
 * Simple Spearman Rank Correlation approximation
 */
export const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  if (n === 0) return 0;
  
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  
  let num = 0;
  let denX = 0;
  let denY = 0;
  
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  
  const denominator = Math.sqrt(denX * denY);
  return denominator === 0 ? 0 : num / denominator;
};
