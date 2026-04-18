import { Check, Type } from "lucide-react";
import { useState } from "react";

const fonts = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Calibri", value: "Calibri, Arial, sans-serif" },
  { name: "Helvetica", value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { name: "Garamond", value: 'Garamond, "Times New Roman", serif' },
  { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { name: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
];

const FontPicker = ({ selectedFont, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeFont =
    fonts.find((font) => font.value === selectedFont) || fonts[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
      >
        <Type className="size-4" />
        <span className="max-sm:hidden">{activeFont.name}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          {fonts.map((font) => (
            <button
              key={font.value}
              type="button"
              onClick={() => {
                onChange(font.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                selectedFont === font.value
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-slate-800">{font.name}</p>
                <p
                  className="mt-1 text-xs text-slate-500"
                  style={{ fontFamily: font.value }}
                >
                  ATS-friendly sample text
                </p>
              </div>

              {selectedFont === font.value && (
                <Check className="size-4 text-emerald-700" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontPicker;
