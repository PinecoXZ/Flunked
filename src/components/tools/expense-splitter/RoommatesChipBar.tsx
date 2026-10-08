import React from "react";
import { Plus } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

export interface RoommatesChipBarProps {
  people: string[];
  newPersonName: string;
  onNewPersonNameChange: (val: string) => void;
  onAddPerson: (e: React.FormEvent) => void;
  onRemovePerson: (name: string) => void;
}

export const RoommatesChipBar = React.memo(function RoommatesChipBar({
  people,
  newPersonName,
  onNewPersonNameChange,
  onAddPerson,
  onRemovePerson,
}: RoommatesChipBarProps) {
  return (
    <NeoCard className="p-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
          Roommates in this group
        </label>
        <span className="text-[11px] text-black/60 font-mono font-bold">Min 2 people</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {people.map((person) => (
          <div
            key={person}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-flunked-bg border-2 border-black text-xs font-mono text-black font-black shadow-neo-sm"
          >
            <span>{person}</span>
            {people.length > 2 && (
              <button
                type="button"
                onClick={() => onRemovePerson(person)}
                className="text-black/50 hover:text-rose-600 transition-colors ml-1 font-black cursor-pointer"
                title="Remove person"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onAddPerson} className="flex gap-2 max-w-sm">
        <input
          type="text"
          value={newPersonName}
          onChange={(e) => onNewPersonNameChange(e.target.value)}
          placeholder="Add friend (e.g. Tanmay)"
          className="flex-1 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-black text-xs font-mono font-bold placeholder:text-black/40 focus:ring-2 focus:ring-flunked-yellow focus:outline-none shadow-neo-sm"
        />
        <NeoButton type="submit" size="sm" icon={<Plus className="w-3.5 h-3.5 text-black" />}>
          Add
        </NeoButton>
      </form>
    </NeoCard>
  );
});
