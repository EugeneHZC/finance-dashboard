import { describe, it, expect } from 'vitest';
import { formatMoney, computePercentChange, sumMinorUnits, TRUE_MINUS } from '../src/lib/money';

describe('formatMoney', () => {
  it('formats positive minor units correctly', () => {
    expect(formatMoney(125050)).toBe('$1,250.50');
  });

  it('formats zero correctly', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });

  it('formats negative minor units using true Unicode minus', () => {
    const formatted = formatMoney(-4520);
    expect(formatted).toBe(`${TRUE_MINUS}$45.20`);
    expect(formatted.includes('-')).toBe(false); // standard hyphen should not be present
    expect(formatted.includes(TRUE_MINUS)).toBe(true);
  });

  it('supports explicit plus sign for positive numbers', () => {
    expect(formatMoney(32000, { showExplicitSign: true })).toBe('+$320.00');
  });

  it('supports omitting currency symbol for table numeric columns', () => {
    expect(formatMoney(150000, { omitCurrencySymbol: true })).toBe('1,500.00');
    expect(formatMoney(-5000, { omitCurrencySymbol: true })).toBe(`${TRUE_MINUS}50.00`);
  });
});

describe('computePercentChange', () => {
  it('computes positive percentage change accurately', () => {
    const res = computePercentChange(112000, 100000);
    expect(res.formattedPercent).toBe('+12.0%');
    expect(res.isGain).toBe(true);
    expect(res.isLoss).toBe(false);
  });

  it('computes negative percentage change accurately with true minus', () => {
    const res = computePercentChange(90000, 100000);
    expect(res.formattedPercent).toBe(`${TRUE_MINUS}10.0%`);
    expect(res.isGain).toBe(false);
    expect(res.isLoss).toBe(true);
  });

  it('returns n/a when previous amount is 0 (rule requirement)', () => {
    const res = computePercentChange(50000, 0);
    expect(res.formattedPercent).toBe('n/a');
    expect(res.ratio).toBeNull();
    expect(res.isGain).toBe(false);
    expect(res.isLoss).toBe(false);
  });

  it('returns 0.0% when current equals previous', () => {
    const res = computePercentChange(100000, 100000);
    expect(res.formattedPercent).toBe('0.0%');
    expect(res.isNeutral).toBe(true);
  });
});

describe('sumMinorUnits', () => {
  it('sums minor unit integers without floating-point error', () => {
    // 0.1 + 0.2 in floating point is 0.30000000000000004
    // in minor units: 10 + 20 = 30 cents exactly
    const items = [10, 20, 70, 100];
    expect(sumMinorUnits(items)).toBe(200);
  });
});
