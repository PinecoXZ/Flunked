import React from "react";
import { ShieldAlert, MailX, GraduationCap, Sparkles } from "lucide-react";

export function WhyCollegeOnly() {
  const points = [
    {
      icon: <ShieldAlert className="w-6 h-6 stroke-[2.5] text-black" />,
      badge: "No Snooping",
      title: "No corporate recruiters snooping",
      desc: "HRs and recruiters have no business seeing your attendance crisis or hostel debt splits. A student-first space keeps corporate busybodies and intrusive surveillance strictly outside.",
    },
    {
      icon: <MailX className="w-6 h-6 stroke-[2.5] text-black" />,
      badge: "Zero Spam",
      title: "Zero spam, no passwords",
      desc: "No 'Hey bro check out this DSA cohort' spam. No accounts to manage, no passwords to forget, no marketing fluff. Just enter your name & college, crunch your survival math, and get back to college life.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 stroke-[2.5] text-black" />,
      badge: "Campus Tailored",
      title: "Built for Indian students",
      desc: "Generic calculators don't know the pain of 75% attendance rules, internal marks formulas, hostel split fights, or Day-1 placement offer letter taxes. We built this because we lived it.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black uppercase tracking-wider shadow-neo-sm">
          <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Student Protection Protocol</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
          Why do we ask for your campus?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((pt, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white border-2 border-black p-6 sm:p-7 flex flex-col justify-between transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-flunked-yellow border-2 border-black shadow-neo-sm text-black">
                  {pt.icon}
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded border-2 border-black uppercase font-black bg-white shadow-neo-sm text-black">
                  {pt.badge}
                </span>
              </div>

              <h3 className="text-lg font-black text-black">{pt.title}</h3>
              <p className="text-xs sm:text-sm text-flunked-muted leading-relaxed font-sans font-medium">
                {pt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
