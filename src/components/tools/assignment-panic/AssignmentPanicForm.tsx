import React from "react";
import { type AssignmentType, type CaffeineType } from "@/lib/calculations";
import {
  FileText,
  Coffee,
  Users,
  Flame,
  Zap,
  PenLine,
  Terminal,
  Keyboard,
  Droplets,
  UserCheck,
} from "lucide-react";
import { NeoCard } from "@/components/ui/NeoCard";

export interface AssignmentPanicFormProps {
  pages: number;
  hoursLeft: number;
  type: AssignmentType;
  caffeine: CaffeineType;
  withFriends: boolean;
  onPagesChange: (val: number) => void;
  onHoursLeftChange: (val: number) => void;
  onTypeChange: (val: AssignmentType) => void;
  onCaffeineChange: (val: CaffeineType) => void;
  onWithFriendsChange: (val: boolean) => void;
}

export const AssignmentPanicForm = React.memo(function AssignmentPanicForm({
  pages,
  hoursLeft,
  type,
  caffeine,
  withFriends,
  onPagesChange,
  onHoursLeftChange,
  onTypeChange,
  onCaffeineChange,
  onWithFriendsChange,
}: AssignmentPanicFormProps) {
  return (
    <NeoCard className="p-6 sm:p-8 space-y-6">
      <div className="border-b-2 border-black pb-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-black font-black">
          Assignment Parameters
        </h3>
        <p className="text-xs text-black/70 mt-1 font-sans font-medium">
          Calculate if completing this assignment before the portal closes is humanly feasible.
        </p>
      </div>

      {/* Sliders: Pages & Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pages */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Pages Left to Write
            </label>
            <span className="font-mono text-lg sm:text-xl font-black text-black bg-flunked-yellow px-2 py-0.5 rounded border border-black shadow-neo-sm">
              {pages} pages
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={pages}
            onChange={(e) => onPagesChange(Number(e.target.value))}
            className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
          />
          <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
            <span>1 page</span>
            <span>20 pages</span>
            <span>40 pages (Thesis)</span>
          </div>
        </div>

        {/* Hours Left */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Hours Left Until Portal Closes
            </label>
            <span className="font-mono text-lg sm:text-xl font-black text-black bg-flunked-yellow px-2 py-0.5 rounded border border-black shadow-neo-sm">
              {hoursLeft} hours
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={24}
            step={0.5}
            value={hoursLeft}
            onChange={(e) => onHoursLeftChange(Number(e.target.value))}
            className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
          />
          <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
            <span>30 mins (Death)</span>
            <span>8 hours</span>
            <span>24 hours (Tomorrow)</span>
          </div>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        {/* Submission Type */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-2">
            Submission Format
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            {[
              { id: "handwritten", label: "Handwritten", Icon: PenLine },
              { id: "lab_record", label: "Lab Record", Icon: FileText },
              { id: "typed", label: "Typed Doc", Icon: Keyboard },
              { id: "code_report", label: "Code + Output", Icon: Terminal },
            ].map((item) => {
              const isSelected = type === item.id;
              const ItemIcon = item.Icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTypeChange(item.id as AssignmentType)}
                  className={`p-2 rounded-xl border-2 border-black text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20"
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5 text-black" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caffeine Multiplier */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-2">
            Caffeine Fuel
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            {[
              { id: "none", label: "Pure Water", Icon: Droplets },
              { id: "chai", label: "Tapri Chai", Icon: Coffee },
              { id: "redbull", label: "Red Bull", Icon: Zap },
              { id: "adderall_spirit", label: "3 AM Panic", Icon: Flame },
            ].map((item) => {
              const isSelected = caffeine === item.id;
              const ItemIcon = item.Icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onCaffeineChange(item.id as CaffeineType)}
                  className={`p-2 rounded-xl border-2 border-black text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20"
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5 text-black" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Writing With Friends Toggle */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-2">
            Writing in Hostel with Friends?
          </label>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => onWithFriendsChange(true)}
              className={`p-2 rounded-xl border-2 border-black text-center transition-all cursor-pointer ${
                withFriends
                  ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-black" />
                <span>Hostel Gang</span>
              </div>
              <div className="text-[10px] text-black/70 mt-0.5 font-sans font-bold">-25% speed</div>
            </button>
            <button
              type="button"
              onClick={() => onWithFriendsChange(false)}
              className={`p-2 rounded-xl border-2 border-black text-center transition-all cursor-pointer ${
                !withFriends
                  ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-black" />
                <span>Solo Monk</span>
              </div>
              <div className="text-[10px] text-black/70 mt-0.5 font-sans font-bold">Full focus</div>
            </button>
          </div>
        </div>
      </div>
    </NeoCard>
  );
});
