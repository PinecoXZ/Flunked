/**
 * CTC → In-Hand Salary Calculation
 * Implements Indian taxation, EPF, Gratuity, and New Tax Regime rules.
 */

export interface CtcBreakdown {
  ctc: number;
  bonus: number;
  esop: number;
  isMetro: boolean;
  fixedCtc: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  employerPf: number;
  employeePf: number;
  gratuity: number;
  grossSalaryAnnual: number;
  monthlyGross: number;
  professionalTax: number;
  standardDeduction: number;
  taxableIncome: number;
  taxBeforeCess: number;
  section87aRebate: number;
  taxAfterRebate: number;
  cess: number;
  totalTaxAnnual: number;
  totalDeductionsAnnual: number;
  netTakeHomeAnnual: number;
  monthlyTakeHome: number;
  monthlyTakeHomeWithoutBonus: number;
  monthlyCtcIllusion: number;
  deductionPercentage: number;
}

/**
 * Calculates realistic Indian monthly in-hand take home salary.
 * - Base salary (~45% of fixed CTC)
 * - Employer PF (12% of basic)
 * - Employee PF (12% of basic)
 * - Gratuity (~4.81% of basic)
 * - Professional Tax (₹2400/yr)
 * - New Tax Regime FY 2024-25 / 2025-26:
 *   - ₹75,000 Standard Deduction
 *   - Section 87A rebate for taxable income <= ₹7,00,000
 *   - Slabs: 0-3L (0%), 3-7L (5%), 7-10L (10%), 10-12L (15%), 12-15L (20%), >15L (30%)
 *   - 4% Health & Education Cess
 * - Monthly take-home = (Gross - Deductions - Tax) / 12
 */
export function calculateCtcInHand(
  ctc: number,
  bonus: number = 0,
  esop: number = 0,
  isMetro: boolean = true
): CtcBreakdown {
  const safeCtc = Math.max(0, ctc);
  const safeBonus = Math.max(0, Math.min(bonus, safeCtc));
  const safeEsop = Math.max(0, Math.min(esop, safeCtc - safeBonus));

  const fixedCtc = Math.max(0, safeCtc - safeEsop - safeBonus);
  const basicSalary = Math.round(fixedCtc * 0.45);
  const employerPf = Math.round(basicSalary * 0.12);
  const employeePf = Math.round(basicSalary * 0.12);
  const gratuity = Math.round(basicSalary * 0.0481);

  const hraRate = isMetro ? 0.5 : 0.4;
  const potentialHra = Math.round(basicSalary * hraRate);
  const remainingCash = Math.max(0, fixedCtc - basicSalary - employerPf - gratuity);
  const hra = Math.min(potentialHra, Math.round(remainingCash * 0.5));
  const specialAllowance = Math.max(0, remainingCash - hra);

  const grossSalaryAnnual = Math.max(0, fixedCtc - employerPf - gratuity + safeBonus);
  const monthlyGross = Math.round(grossSalaryAnnual / 12);
  const professionalTax = 2400;

  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossSalaryAnnual - standardDeduction);

  const computeTax = (taxable: number) => {
    let tax = 0;
    if (taxable > 1500000) {
      tax += (taxable - 1500000) * 0.3;
      tax += 300000 * 0.2;
      tax += 200000 * 0.15;
      tax += 300000 * 0.1;
      tax += 400000 * 0.05;
    } else if (taxable > 1200000) {
      tax += (taxable - 1200000) * 0.2;
      tax += 200000 * 0.15;
      tax += 300000 * 0.1;
      tax += 400000 * 0.05;
    } else if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.15;
      tax += 300000 * 0.1;
      tax += 400000 * 0.05;
    } else if (taxable > 700000) {
      tax += (taxable - 700000) * 0.1;
      tax += 400000 * 0.05;
    } else if (taxable > 300000) {
      tax += (taxable - 300000) * 0.05;
    }

    tax = Math.round(tax);
    const rebate = taxable <= 700000 ? tax : 0;
    const afterRebate = Math.max(0, tax - rebate);
    const cess = Math.round(afterRebate * 0.04);
    return {
      taxBeforeCess: tax,
      rebate,
      totalTax: afterRebate + cess,
      cess,
    };
  };

  const fullTax = computeTax(taxableIncome);
  const taxBeforeCess = fullTax.taxBeforeCess;
  const section87aRebate = fullTax.rebate;
  const taxAfterRebate = Math.max(0, taxBeforeCess - section87aRebate);
  const cess = fullTax.cess;
  const totalTaxAnnual = fullTax.totalTax;

  const totalDeductionsAnnual = employeePf + professionalTax + totalTaxAnnual;
  const netTakeHomeAnnual = Math.max(0, grossSalaryAnnual - totalDeductionsAnnual);
  const monthlyTakeHome = Math.round(netTakeHomeAnnual / 12);

  // Take-home calculation for normal non-bonus months
  const grossWithoutBonus = Math.max(0, fixedCtc - employerPf - gratuity);
  const taxableWithoutBonus = Math.max(0, grossWithoutBonus - standardDeduction);
  const taxWithoutBonus = computeTax(taxableWithoutBonus);
  const totalDeductionsWithoutBonus =
    employeePf + professionalTax + taxWithoutBonus.totalTax;
  const netTakeHomeWithoutBonus = Math.max(
    0,
    grossWithoutBonus - totalDeductionsWithoutBonus
  );
  const monthlyTakeHomeWithoutBonus = Math.round(netTakeHomeWithoutBonus / 12);
  const monthlyCtcIllusion = Math.round(safeCtc / 12);

  const deductionPercentage =
    safeCtc > 0 ? Math.round(((safeCtc - netTakeHomeAnnual) / safeCtc) * 100) : 0;

  return {
    ctc: safeCtc,
    bonus: safeBonus,
    esop: safeEsop,
    isMetro,
    fixedCtc,
    basicSalary,
    hra,
    specialAllowance,
    employerPf,
    employeePf,
    gratuity,
    grossSalaryAnnual,
    monthlyGross,
    professionalTax,
    standardDeduction,
    taxableIncome,
    taxBeforeCess,
    section87aRebate,
    taxAfterRebate,
    cess,
    totalTaxAnnual,
    totalDeductionsAnnual,
    netTakeHomeAnnual,
    monthlyTakeHome,
    monthlyTakeHomeWithoutBonus,
    monthlyCtcIllusion,
    deductionPercentage,
  };
}
