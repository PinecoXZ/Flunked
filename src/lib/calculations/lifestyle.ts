/**
 * Daily Life & Chaos Calculations for Flunked.online
 * Covering Am I Cooked Calculator, Hostel Expense Splitter, and Assignment Panic Calculator.
 */

// ==========================================
// 1. Am I Cooked Calculator
// ==========================================

export type CookedTier = "fine" | "risky" | "cooked" | "gone";

export interface AmICookedResult {
  cookedPercentage: number;
  tier: CookedTier;
  badge: string;
  verdict: string;
  subtext: string;
  survivalProbability: number;
  flameLevel: number;
  color: string;
  adviceList: string[];
  diagnosis: {
    attendanceHazard: string;
    internalsHazard: string;
    timelineHazard: string;
    assignmentsHazard: string;
  };
}

export function calculateAmICooked(
  attendance: number,
  internalsAvg: number,
  weeksLeft: number,
  pendingAssignments: number
): AmICookedResult {
  const safeAtt = Math.max(0, Math.min(100, attendance));
  const safeInternals = Math.max(0, Math.min(100, internalsAvg));
  const safeWeeks = Math.max(1, Math.min(20, weeksLeft));
  const safeAssignments = Math.max(0, Math.min(25, pendingAssignments));

  let attCooked = 0;
  if (safeAtt >= 85) attCooked = 5;
  else if (safeAtt >= 75) attCooked = 25 - (safeAtt - 75) * 2;
  else if (safeAtt >= 65) attCooked = 70 - (safeAtt - 65) * 4;
  else attCooked = Math.min(100, 95 + (65 - safeAtt));

  let internalsCooked = 0;
  if (safeInternals >= 80) internalsCooked = 5;
  else if (safeInternals >= 60) internalsCooked = 30 - (safeInternals - 60) * 1.2;
  else if (safeInternals >= 40) internalsCooked = 65 - (safeInternals - 40) * 1.5;
  else internalsCooked = Math.min(100, 95 + (40 - safeInternals));

  const assignmentCooked = Math.min(100, safeAssignments * 8);
  const rawCooked = attCooked * 0.4 + internalsCooked * 0.35 + assignmentCooked * 0.25;

  let runwayMultiplier = 1.0;
  if (safeWeeks <= 2) {
    runwayMultiplier = 1.35;
  } else if (safeWeeks <= 4) {
    runwayMultiplier = 1.15;
  } else if (safeWeeks >= 10) {
    runwayMultiplier = 0.85;
  }

  const finalCookedScore = Math.max(0, Math.min(100, Math.round(rawCooked * runwayMultiplier)));
  const survivalProbability = Math.max(0, 100 - finalCookedScore);

  let tier: CookedTier;
  let badge: string;
  let verdict: string;
  let subtext: string;
  let flameLevel: number;
  let color: string;
  const adviceList: string[] = [];

  if (finalCookedScore < 30) {
    tier = "fine";
    badge = "You're Fine [Safe Zone]";
    verdict = "You're fine. Stop panicking and study.";
    subtext =
      "Your academic house is in order. You are stressing over standard college anxiety rather than real danger.";
    flameLevel = 1;
    color = "#22c55e";
    adviceList.push("Keep maintaining your attendance above 75% so you don't burn buffer days.");
    adviceList.push(
      "Wrap up the " +
        (safeAssignments > 0 ? safeAssignments : "few") +
        " pending assignments over the weekend."
    );
    adviceList.push("Focus on scoring 85%+ in end-sems to push your CGPA into topper territory.");
  } else if (finalCookedScore < 60) {
    tier = "risky";
    badge = "On The Edge [Warning]";
    verdict = "You're on the edge. One bad exam and it's over.";
    subtext =
      "You are walking a tightrope. A surprise quiz or 2 missed lab sessions will drop you into detention.";
    flameLevel = 2;
    color = "#f5c518";
    adviceList.push(
      safeAtt < 78
        ? "Do NOT miss a single class for the next 2 weeks. Every lecture is sacred."
        : "Hold the line on attendance; you have zero margin for error."
    );
    adviceList.push(
      "Submit all pending assignments immediately to capture those free 5-10 internal marks."
    );
    adviceList.push(
      "Get past 3 years' end-sem question papers from the college xerox shop immediately."
    );
  } else if (finalCookedScore < 85) {
    tier = "cooked";
    badge = "Certified Cooked [Severe]";
    verdict = "You're cooked. But it's recoverable. Probably.";
    subtext =
      "The smell of burning GPA is in the air. You need an aggressive academic emergency intervention.";
    flameLevel = 3;
    color = "#f97316";
    adviceList.push(
      "Emergency meeting with the CR (Class Representative) to identify lenient professors."
    );
    adviceList.push(
      "Draft a handwritten apology letter / medical certificate to cover missing attendance percentage."
    );
    adviceList.push("Beg, borrow, or clone assignments from friends in other sections tonight.");
    adviceList.push("Cut down all gaming and series bingeing until end-sem results are declared.");
  } else {
    tier = "gone";
    badge = "Completely Charred [Critical]";
    verdict = "Bro. Talk to your parents.";
    subtext =
      "You have achieved thermodynamic equilibrium with academic doom. Immediate damage control required.";
    flameLevel = 4;
    color = "#ef4444";
    adviceList.push("Visit the HOD office with a parent signature and your most apologetic face.");
    adviceList.push(
      "Calculate your university's year-back / backlogs limit before you get debarred."
    );
    adviceList.push("Find out which subjects have re-appear exams or summer courses available.");
    adviceList.push(
      "Prepare your mental script for when relatives ask about your semester results."
    );
  }

  return {
    cookedPercentage: finalCookedScore,
    tier,
    badge,
    verdict,
    subtext,
    survivalProbability,
    flameLevel,
    color,
    adviceList,
    diagnosis: {
      attendanceHazard:
        safeAtt >= 75
          ? "Attendance safe at " + safeAtt + "%"
          : "ATTENDANCE ALERT: " + safeAtt + "% is below the 75% threshold!",
      internalsHazard:
        safeInternals >= 50
          ? "Internals avg: " + safeInternals + "%"
          : "CRITICAL: Internals average (" + safeInternals + "%) is dragging your GPA down.",
      timelineHazard: safeWeeks + " weeks left in the semester to rescue your grades.",
      assignmentsHazard:
        safeAssignments > 0
          ? safeAssignments + " pending assignments threatening internal marks."
          : "All assignments cleared.",
    },
  };
}

// ==========================================
// 2. Hostel Expense Splitter (Debt Minimization)
// ==========================================

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
}

export interface DebtSettlement {
  from: string;
  to: string;
  amount: number;
}

export interface ExpenseSplitResult {
  totalSpent: number;
  perPersonSpent: Record<string, number>;
  netBalances: Record<string, number>;
  settlements: DebtSettlement[];
  whatsAppSummary: string;
}

export function solveExpenseSplit(
  people: string[],
  expenses: Array<{
    description: string;
    amount: number;
    paidBy: string;
    splitAmong: string[];
  }>
): ExpenseSplitResult {
  const cleanPeople = Array.from(new Set(people.map((p) => p.trim()))).filter((p) => p.length > 0);

  const netBalances: Record<string, number> = {};
  const perPersonSpent: Record<string, number> = {};

  cleanPeople.forEach((p) => {
    netBalances[p] = 0;
    perPersonSpent[p] = 0;
  });

  let totalSpent = 0;

  expenses.forEach((expense) => {
    const amt = Math.max(0, expense.amount);
    if (amt <= 0) return;

    const participants = expense.splitAmong
      .map((p) => p.trim())
      .filter((p) => cleanPeople.includes(p));

    if (participants.length === 0) return;

    totalSpent += amt;
    const paidBy = expense.paidBy.trim();

    if (perPersonSpent[paidBy] !== undefined) {
      perPersonSpent[paidBy] += amt;
    }

    if (netBalances[paidBy] !== undefined) {
      netBalances[paidBy] += amt;
    }

    const share = amt / participants.length;
    participants.forEach((person) => {
      if (netBalances[person] !== undefined) {
        netBalances[person] -= share;
      }
    });
  });

  interface PersonBalance {
    name: string;
    balance: number;
  }

  const debtors: PersonBalance[] = [];
  const creditors: PersonBalance[] = [];

  Object.entries(netBalances).forEach(([name, bal]) => {
    const roundedBal = Math.round(bal * 100) / 100;
    if (roundedBal < -0.5) {
      debtors.push({ name, balance: roundedBal });
    } else if (roundedBal > 0.5) {
      creditors.push({ name, balance: roundedBal });
    }
  });

  debtors.sort((a, b) => a.balance - b.balance);
  creditors.sort((a, b) => b.balance - a.balance);

  const settlements: DebtSettlement[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const oweAmount = -debtor.balance;
    const receiveAmount = creditor.balance;

    const settled = Math.min(oweAmount, receiveAmount);
    const settledRounded = Math.round(settled);

    if (settledRounded > 0) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: settledRounded,
      });
    }

    debtor.balance += settled;
    creditor.balance -= settled;

    if (Math.abs(debtor.balance) < 0.5) {
      i++;
    }
    if (Math.abs(creditor.balance) < 0.5) {
      j++;
    }
  }

  let summary = `*Hostel Expense Settlement* [Flunked.online]\n`;
  summary += `Total Spent: ₹${Math.round(totalSpent).toLocaleString("en-IN")}\n`;
  summary += `--------------------------\n`;

  if (settlements.length === 0) {
    summary += `Everyone is settled up. Zero debts remaining.\n`;
  } else {
    summary += `*Settlements to Pay via UPI:*\n`;
    settlements.forEach((s) => {
      summary += `• *${s.from}* owes *${s.to}*: ₹${s.amount.toLocaleString("en-IN")}\n`;
    });
  }

  summary += `--------------------------\n`;
  summary += `Calculated via flunked.online/tools/expense-splitter`;

  return {
    totalSpent: Math.round(totalSpent),
    perPersonSpent,
    netBalances,
    settlements,
    whatsAppSummary: summary,
  };
}

// ==========================================
// 3. Assignment Panic Calculator
// ==========================================

export type AssignmentType = "handwritten" | "typed" | "lab_record" | "code_report";

export type CaffeineType = "none" | "chai" | "redbull" | "adderall_spirit";

export interface AssignmentPanicResult {
  pagesRequired: number;
  hoursLeft: number;
  pagesPerHourNeeded: number;
  humanCapacityPages: number;
  feasibilityPercentage: number;
  status: "chill" | "manageable" | "all_nighter" | "impossible";
  headline: string;
  tacticalVerdict: string;
  tacticalPlan: string[];
  beggingCrProbability: number;
  timeBreakdown: {
    writingHours: number;
    diagramHours: number;
    distractionHours: number;
    emergencyBufferHours: number;
  };
}

export function calculateAssignmentPanic(
  pages: number,
  hoursLeft: number,
  type: AssignmentType = "handwritten",
  caffeine: CaffeineType = "chai",
  withFriends: boolean = true
): AssignmentPanicResult {
  const safePages = Math.max(1, pages);
  const safeHours = Math.max(0.2, hoursLeft);
  const pagesPerHourNeeded = parseFloat((safePages / safeHours).toFixed(1));

  const baseSpeedMap: Record<AssignmentType, number> = {
    handwritten: 3.5,
    typed: 7.5,
    lab_record: 2.2,
    code_report: 5.5,
  };

  const caffeineMultMap: Record<CaffeineType, number> = {
    none: 1.0,
    chai: 1.2,
    redbull: 1.45,
    adderall_spirit: 1.7,
  };

  let friendsMultiplier = withFriends ? 0.75 : 1.0;
  if (withFriends && type === "lab_record") {
    friendsMultiplier = 1.15;
  }

  const effectiveSpeedPerHour = baseSpeedMap[type] * caffeineMultMap[caffeine] * friendsMultiplier;

  const humanCapacityPages = Math.round(effectiveSpeedPerHour * safeHours);
  const feasibilityPercentage = Math.min(
    100,
    Math.max(2, Math.round((humanCapacityPages / safePages) * 100))
  );

  let status: "chill" | "manageable" | "all_nighter" | "impossible";
  let headline: string;
  let tacticalVerdict: string;
  let beggingCrProbability: number;
  const tacticalPlan: string[] = [];

  if (feasibilityPercentage >= 85) {
    status = "chill";
    headline = "You're fine. Chill for a bit.";
    tacticalVerdict =
      "You have enough runway to watch 1 episode of anime, make Maggi, and still finish 30 minutes before deadline.";
    beggingCrProbability = 5;
    tacticalPlan.push("Start writing at a steady, relaxed pace.");
    tacticalPlan.push("Keep handwriting legible so professors don't get suspicious.");
    tacticalPlan.push("Submit comfortably 15 minutes before the portal closes.");
  } else if (feasibilityPercentage >= 55) {
    status = "manageable";
    headline = "Tight, but humanly doable.";
    tacticalVerdict =
      "Put your phone on 'Do Not Disturb'. If you stop scrolling Instagram, you will make it out alive.";
    beggingCrProbability = 30;
    tacticalPlan.push("Stop checking WhatsApp group chat every 4 minutes.");
    tacticalPlan.push("Increase line spacing and write slightly larger letters.");
    tacticalPlan.push("Leave diagrams for the end; write all theoretical text first.");
  } else if (feasibilityPercentage >= 30) {
    status = "all_nighter";
    headline = "Sacrifices must be made to the Engineering Gods.";
    tacticalVerdict =
      "You are writing " +
      pagesPerHourNeeded +
      " pages per hour. Hand cramps are guaranteed. Brew strong black coffee immediately.";
    beggingCrProbability = 65;
    tacticalPlan.push(
      "Deploy the 'Enlarge Diagram' tactic: make every diagram occupy 75% of the page."
    );
    tacticalPlan.push(
      "Skip introduction paragraphs and dive straight into formulas and conclusions."
    );
    tacticalPlan.push(
      "If with friends, institute complete silence or kick them out of the hostel room."
    );
    tacticalPlan.push("Prepare a backup excuse for why the portal failed to upload on time.");
  } else {
    status = "impossible";
    headline = "Statistically Impossible. Call the CR.";
    tacticalVerdict =
      "You need " +
      pagesPerHourNeeded +
      " pages/hour. Unless you possess 4 hands or a mechanical printer in your arm, you cannot finish this alone.";
    beggingCrProbability = 95;
    tacticalPlan.push(
      "Plead with the Class Representative to ask professor for an extension till 5 PM."
    );
    tacticalPlan.push("Fabricate a medical certificate or claim severe hostel WiFi outage.");
    tacticalPlan.push(
      "Assemble 3 roommates and assign 4 pages to each person (assembly line mode)."
    );
    tacticalPlan.push("Upload a corrupted PDF file to buy 6 extra hours before teacher notices.");
  }

  const totalSafeMinutes = safeHours * 60;
  const writingMinutes = Math.round(totalSafeMinutes * 0.65);
  const diagramMinutes = Math.round(totalSafeMinutes * 0.2);
  const distractionMinutes = withFriends ? Math.round(totalSafeMinutes * 0.1) : 0;
  const bufferMinutes = Math.max(
    0,
    totalSafeMinutes - writingMinutes - diagramMinutes - distractionMinutes
  );

  return {
    pagesRequired: safePages,
    hoursLeft: safeHours,
    pagesPerHourNeeded,
    humanCapacityPages,
    feasibilityPercentage,
    status,
    headline,
    tacticalVerdict,
    tacticalPlan,
    beggingCrProbability,
    timeBreakdown: {
      writingHours: parseFloat((writingMinutes / 60).toFixed(1)),
      diagramHours: parseFloat((diagramMinutes / 60).toFixed(1)),
      distractionHours: parseFloat((distractionMinutes / 60).toFixed(1)),
      emergencyBufferHours: parseFloat((bufferMinutes / 60).toFixed(1)),
    },
  };
}
