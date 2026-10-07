import { config } from './config';

/**
 * True Unicode minus sign (−, U+2212).
 * Brand guideline rule: "Negative amounts use a true minus sign (−)."
 */
export const TRUE_MINUS = '\u2212';

/**
 * Formats a minor-unit integer (cents) into a currency string.
 * Example: 1050 -> "$10.50", -1050 -> "−$10.50"
 */
export function formatMoney(
  amountMinor: number,
  options?: {
    showExplicitSign?: boolean;
    omitCurrencySymbol?: boolean;
  }
): string {
  // Ensure integer
  const safeMinor = Math.round(amountMinor);
  const majorUnits = safeMinor / 100;

  if (options?.omitCurrencySymbol) {
    const formatter = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formatted = formatter.format(Math.abs(majorUnits));
    if (safeMinor < 0) {
      return `${TRUE_MINUS}${formatted}`;
    }
    if (options?.showExplicitSign && safeMinor > 0) {
      return `+${formatted}`;
    }
    return formatted;
  }

  const formatter = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
  });

  // Handle standard Intl formatting
  const formatted = formatter.format(Math.abs(majorUnits));

  if (safeMinor < 0) {
    return `${TRUE_MINUS}${formatted}`;
  }
  if (options?.showExplicitSign && safeMinor > 0) {
    return `+${formatted}`;
  }
  return formatted;
}

/**
 * Returns currency symbol or code for table headers.
 * Rule: "with the currency or unit in the header, not repeated in every cell."
 */
export function getCurrencyHeaderUnit(): string {
  const parts = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
  }).formatToParts(0);

  const symbolPart = parts.find((p) => p.type === 'currency');
  return symbolPart ? symbolPart.value : config.currency;
}

/**
 * Computes percentage change: (current - previous) / |previous|
 * Rule: "Percent change: (current − previous) / |previous|. If previous is 0, show 'n/a', not infinity."
 */
export function computePercentChange(
  currentMinor: number,
  previousMinor: number
): {
  ratio: number | null;
  percentValue: number | null;
  formattedPercent: string;
  isGain: boolean;
  isLoss: boolean;
  isNeutral: boolean;
} {
  if (previousMinor === 0) {
    return {
      ratio: null,
      percentValue: null,
      formattedPercent: 'n/a',
      isGain: false,
      isLoss: false,
      isNeutral: true,
    };
  }

  const diff = currentMinor - previousMinor;
  const ratio = diff / Math.abs(previousMinor);
  const percentValue = ratio * 100;

  let formattedPercent: string;
  const absFormatted = Math.abs(percentValue).toFixed(1) + '%';

  if (diff > 0) {
    formattedPercent = `+${absFormatted}`;
  } else if (diff < 0) {
    formattedPercent = `${TRUE_MINUS}${absFormatted}`;
  } else {
    formattedPercent = '0.0%';
  }

  return {
    ratio,
    percentValue,
    formattedPercent,
    isGain: diff > 0,
    isLoss: diff < 0,
    isNeutral: diff === 0,
  };
}

/**
 * Exact integer sum of items with minor-unit amounts.
 */
export function sumMinorUnits(items: readonly number[]): number {
  return items.reduce((total, val) => total + Math.round(val), 0);
}
