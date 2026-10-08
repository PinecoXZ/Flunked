export interface AttendancePreset {
  id: string;
  name: string;
  shortName: string;
  targetPercent: number;
  badge: string;
  ruleSummary: string;
  popularColleges?: string;
}

export const ATTENDANCE_PRESETS: AttendancePreset[] = [
  {
    id: "ugc-standard",
    name: "UGC / AICTE Standard (75%)",
    shortName: "UGC 75%",
    targetPercent: 75,
    badge: "Most Common",
    ruleSummary: "Standard 75% minimum mandatory attendance to appear in semester exams.",
    popularColleges: "IITs, NITs, Delhi University, Mumbai Univ, IPU, SRM",
  },
  {
    id: "vtu-strict",
    name: "VTU & Karnataka Autonomous (80%)",
    shortName: "VTU 80%",
    targetPercent: 80,
    badge: "Strict",
    ruleSummary:
      "80% compulsory in each theory/lab subject. Max 10% condonation on medical grounds.",
    popularColleges: "VTU Belagavi, RVCE, BMSCE, MSRIT, PES University",
  },
  {
    id: "anna-strict",
    name: "Anna University & TN State (80%)",
    shortName: "Anna Univ 80%",
    targetPercent: 80,
    badge: "Strict",
    ruleSummary: "Requires minimum 80% aggregate. Condonation permitted only between 70% and 79%.",
    popularColleges: "CEG Guindy, MIT Chennai, PSG Tech, SSN College",
  },
  {
    id: "medical-strict",
    name: "Medical, Dental & Lab Council (85%)",
    shortName: "Medical 85%",
    targetPercent: 85,
    badge: "Rigid",
    ruleSummary: "NMC / DCI regulations mandate 85% attendance for lab and practical sessions.",
    popularColleges: "AIIMS, CMC, KMC Manipal, State Medical Colleges",
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani / Open Attendance (0%)",
    shortName: "BITS (0%)",
    targetPercent: 0,
    badge: "No Minimum",
    ruleSummary:
      "0% mandatory attendance policy. Lectures are optional, but beware of surprise quizzes!",
    popularColleges: "BITS Pilani, Goa & Hyderabad Campuses",
  },
  {
    id: "condonation",
    name: "Medical / Condonation Quota (65%)",
    shortName: "Medical 65%",
    targetPercent: 65,
    badge: "Condoned",
    ruleSummary: "Minimum threshold accepted with hospital certificates and condonation fines.",
    popularColleges: "University Dean / Exam Controller discretion",
  },
];
