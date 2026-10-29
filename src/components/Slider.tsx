"use client";

import { useId } from "react";
import type { Range } from "@/content/credits";

interface Props {
  label: string;
  range: Range;
  value: number;
  onChange: (v: number) => void;
  display: string;
  minLabel: string;
  maxLabel: string;
}

export function Slider({ label, range, value, onChange, display, minLabel, maxLabel }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] font-semibold text-muted">
          {label}
        </label>
        <output htmlFor={id} className="tabular text-xl font-extrabold text-ink">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="tabular flex justify-between text-[13px] text-subtle">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
