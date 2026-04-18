import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // keeping all color options here so it's easy to tweak later
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Yellow", value: "#facc15" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 text-sm font-medium text-violet-700 transition hover:bg-violet-100"
      >
        <Palette className="size-4" />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 grid w-64 grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          {colors.map((color) => (
            <div
              key={color.value}
              className="group relative flex cursor-pointer flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="h-11 w-11 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200 transition group-hover:scale-105"
                style={{ backgroundColor: color.value }}
              />

              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="size-5 text-white drop-shadow" />
                </div>
              )}

              <p className="mt-1 text-center text-[11px] text-slate-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;