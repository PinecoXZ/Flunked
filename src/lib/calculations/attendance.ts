/**
 * Attendance & Bunk Calculations for Flunked.online
 * Powers Bunk Calculator and "Should I Attend This Lecture?" decider.
 */

export interface BunkResult {
  currentPercentage: number;
  targetPercentage: number;
  canBunk: boolean;
  isReachable?: boolean;
  classesCount: number;
  headline: string;
  verdict: string;
  status: "safe" | "warning" | "danger" | "critical";
  shareText: string;
}

export function calculateBunk(held: number, attended: number, target: number = 75): BunkResult {
  const safeHeld = Math.max(0, held);
  const safeAttended = Math.max(0, Math.min(attended, safeHeld));
  const safeTarget = Math.max(1, Math.min(100, target));

  if (safeHeld === 0) {
    return {
      currentPercentage: 100,
      targetPercentage: safeTarget,
      canBunk: true,
      isReachable: true,
      classesCount: 0,
      headline: "No classes held yet.",
      verdict: "Semester hasn't started yet. You have a clean slate.",
      status: "safe",
      shareText: "No classes held yet. Calculated on Flunked.online",
    };
  }

  const currentPercentage = parseFloat(((safeAttended / safeHeld) * 100).toFixed(1));

  if (currentPercentage >= safeTarget) {
    const maxBunk = Math.floor((safeAttended * 100) / safeTarget - safeHeld);
    const classesCount = Math.max(0, maxBunk);

    let status: "safe" | "warning" = "safe";
    let headline = `You can skip ${classesCount} more class${classesCount === 1 ? "" : "es"}.`;
    let verdict = `You can skip ${classesCount} more classes. Don't push it.`;

    if (classesCount === 0) {
      status = "warning";
      headline = "Zero skips left. You're on thin ice.";
      verdict = "Zero. You're already on thin ice.";
    }

    return {
      currentPercentage,
      targetPercentage: safeTarget,
      canBunk: true,
      isReachable: true,
      classesCount,
      headline,
      verdict,
      status,
      shareText: `My attendance is ${currentPercentage}% (Target: ${safeTarget}%). I can bunk ${classesCount} more classes! Calculated on Flunked.online`,
    };
  } else {
    if (safeTarget === 100 && safeAttended < safeHeld) {
      return {
        currentPercentage,
        targetPercentage: 100,
        canBunk: false,
        isReachable: false,
        classesCount: 0,
        headline: "100% attendance is not reachable.",
        verdict: "You missed a class. It is mathematically impossible to reach 100%.",
        status: "critical",
        shareText: `My attendance is ${currentPercentage}%. 100% is no longer reachable this semester. Calculated on Flunked.online`,
      };
    }
    const denominator = 100 - safeTarget;
    const numerator = safeTarget * safeHeld - 100 * safeAttended;
    // Guard against division by zero; never produce Infinity or NaN
    const classesNeeded = denominator > 0 ? Math.ceil(numerator / denominator) : 0;
    const classesCount = Math.max(1, classesNeeded);

    const status: "danger" | "critical" = currentPercentage < 70 ? "critical" : "danger";
    const headline = `You must attend ${classesCount} classes consecutively.`;
    const verdict = `You're below ${safeTarget}%. Talk to your HOD.`;

    return {
      currentPercentage,
      targetPercentage: safeTarget,
      canBunk: false,
      isReachable: true,
      classesCount,
      headline,
      verdict,
      status,
      shareText: `My attendance is ${currentPercentage}% (below ${safeTarget}%). I need to attend ${classesCount} classes consecutively! Calculated on Flunked.online`,
    };
  }
}

export type TeacherStrictness = "chill" | "strict" | "biometric";
export type TirednessLevel = "alive" | "tired" | "zombie";
export type AttendDecision = "attend" | "skip" | "proxy";

export interface AttendOrSkipResult {
  decision: AttendDecision;
  headline: string;
  subtext: string;
  reasoning: string;
  projectedAttendanceAfterSkip: number;
  riskScore: number;
  emoji: string;
  actionText: string;
  color: string;
}

export function attendOrSkipDecider(
  attendance: number,
  proxy: boolean,
  strictness: TeacherStrictness,
  important: boolean,
  tiredness: TirednessLevel
): AttendOrSkipResult {
  const currentAtt = Math.max(0, Math.min(100, attendance));
  const dropPerClass = 2.4;
  const projectedAttendanceAfterSkip = Math.max(
    0,
    parseFloat((currentAtt - dropPerClass).toFixed(1))
  );

  if (strictness === "biometric") {
    if (currentAtt < 77) {
      return {
        decision: "attend",
        headline: "Go. Teacher has biometric eyes.",
        subtext:
          "Your attendance is at " +
          currentAtt +
          "%. Biometric machine does not care about your sleep.",
        reasoning:
          "There is no proxy in biometric. You are literally one absent mark away from detention list and a letter to your parents.",
        projectedAttendanceAfterSkip,
        riskScore: 95,
        emoji: "👁️",
        actionText: "Put your shoes on and run to class.",
        color: "#ef4444",
      };
    }

    if (currentAtt >= 85 && tiredness === "zombie") {
      return {
        decision: "skip",
        headline: "Skip it. You have biometric diplomatic immunity.",
        subtext:
          "Attendance is " +
          currentAtt +
          "%. Skipping drops you to " +
          projectedAttendanceAfterSkip +
          "%.",
        reasoning:
          "Even if the machine logs you absent, your buffer is gigantic. Sleep and recover your sanity.",
        projectedAttendanceAfterSkip,
        riskScore: 25,
        emoji: "😴",
        actionText: "Roll over and sleep till lunch.",
        color: "#22c55e",
      };
    }
  }

  if (currentAtt < 75) {
    if (proxy && strictness === "chill") {
      return {
        decision: "proxy",
        headline: "Proxy exists. You already know the answer.",
        subtext: "Teacher is chill, roll call is a formality. Send your best friend.",
        reasoning:
          "Teacher looks at attendance register once every solar eclipse. A confident 'Present Sir' from the back bench saves your day.",
        projectedAttendanceAfterSkip: currentAtt,
        riskScore: 40,
        emoji: "🤫",
        actionText: "Buy your proxy buddy a canteen samosa.",
        color: "#f5c518",
      };
    }

    return {
      decision: "attend",
      headline: "Go. Your attendance is on life support.",
      subtext:
        "Currently at " +
        currentAtt +
        "%. Skipping drops you to " +
        projectedAttendanceAfterSkip +
        "%.",
      reasoning:
        "You are already in the danger debar zone. If HOD sees your name on the red list, no medical certificate will save you.",
      projectedAttendanceAfterSkip,
      riskScore: 90,
      emoji: "🚨",
      actionText: "Drag yourself to the lecture hall right now.",
      color: "#ef4444",
    };
  }

  if (currentAtt >= 75 && currentAtt < 80) {
    if (proxy && strictness !== "strict" && strictness !== "biometric") {
      return {
        decision: "proxy",
        headline: "Proxy exists. Play the card.",
        subtext: "Attendance is " + currentAtt + "%. Bunking without proxy drops you below 75%.",
        reasoning:
          "One unexcused absence pushes you into 74% territory. Either secure the proxy or sit quietly in the back row.",
        projectedAttendanceAfterSkip: currentAtt,
        riskScore: 50,
        emoji: "🕶️",
        actionText: "Coordinate roll number ping on WhatsApp.",
        color: "#f5c518",
      };
    }

    if (strictness === "strict" || strictness === "biometric") {
      return {
        decision: "attend",
        headline: "Attend. Don't play Russian roulette with 75%.",
        subtext:
          "Teacher is strict and you are at " +
          currentAtt +
          "%. Skipping makes it " +
          projectedAttendanceAfterSkip +
          "%.",
        reasoning:
          "Strict professors count heads manually when they feel like it. Dropping below 75% invites endless drama.",
        projectedAttendanceAfterSkip,
        riskScore: 78,
        emoji: "📚",
        actionText: "Go sit on the 3rd bench and pretend to listen.",
        color: "#f97316",
      };
    }
  }

  if (currentAtt >= 80) {
    if (tiredness === "zombie" || tiredness === "tired") {
      return {
        decision: "skip",
        headline: "Skip it. You're fine. Get some sleep.",
        subtext: "You have " + currentAtt + "% attendance. You earned this bunk.",
        reasoning:
          "Skipping still leaves you comfortably at " +
          projectedAttendanceAfterSkip +
          "%. Staying awake while sleep-deprived in a 90-minute lecture is self-inflicted torture.",
        projectedAttendanceAfterSkip,
        riskScore: 15,
        emoji: "🛌",
        actionText: "Close laptop, order breakfast, go to sleep.",
        color: "#22c55e",
      };
    }

    if (important) {
      return {
        decision: "attend",
        headline: "Attend for the notes, not the attendance.",
        subtext:
          "Attendance is fine (" + currentAtt + "%), but this subject will bite you in end-sems.",
        reasoning:
          "The teacher might drop hints about the 15-mark question paper. Show up, mark attendance, take screenshots of slides.",
        projectedAttendanceAfterSkip,
        riskScore: 20,
        emoji: "📝",
        actionText: "Go, sit with the topper, absorb the syllabus.",
        color: "#f5c518",
      };
    }

    return {
      decision: "skip",
      headline: "Skip it. Go touch grass.",
      subtext: "Attendance: " + currentAtt + "%. You can miss this without a trace.",
      reasoning:
        "College life is about calculated risks. Your attendance is golden. Use this 1 hour to work on a project or chill.",
      projectedAttendanceAfterSkip,
      riskScore: 10,
      emoji: "☕",
      actionText: "Head to the campus cafe.",
      color: "#22c55e",
    };
  }

  return {
    decision: "attend",
    headline: "Better to show up and sleep in class.",
    subtext: "Current: " + currentAtt + "%.",
    reasoning: "When in doubt, show face and maintain professor goodwill.",
    projectedAttendanceAfterSkip,
    riskScore: 45,
    emoji: "🎒",
    actionText: "Head to lecture.",
    color: "#f5c518",
  };
}
