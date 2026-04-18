import { Check, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // keeping all templates here so it's easy to manage / add later
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
    {
      id: "creativeVisual",
      name: "Creative Visual",
      preview:
        "A visually engaging layout with timelines and accent colors for a modern, dynamic presentation.",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      preview:
        "A clean, bold design with structured sections and modern typography.",
    },
    {
      id: "modernProTemplate",
      name: "Modern Pro Template",
      preview:
        "A clean, executive-style resume template designed for senior professionals with strong ATS compatibility.",
    },
    {
      id: "corporateATSTemplate",
      name: "Corporate ATS Template",
      preview:
        "An Applicant Tracking System optimized layout focusing on clarity and keyword visibility.",
    },
    {
      id: "minimalATSTemplate",
      name: "Minimal ATS Template",
      recommended: true,
      preview:
        "A compact ATS-focused resume with simple section rules, dense content layout, and strong readability.",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
      >
        <Layout className="size-4" />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full z-20 mt-2 h-[60vh] w-72 space-y-2 overflow-auto rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative cursor-pointer rounded-lg border p-3 transition ${
                selectedTemplate === template.id
                  ? "border-blue-300 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute right-2 top-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-blue-600">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-800">
                  {template.name}
                  {template.recommended && (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                      Recommended
                    </span>
                  )}
                </h4>
                <div className="mt-2 rounded-md bg-slate-100 p-2 text-xs leading-relaxed text-slate-500">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
