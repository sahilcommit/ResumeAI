import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);

  // to track which experience is currently using AI
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  // add new empty experience block
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  // remove experience by index
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // update single field inside experience
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // AI enhancement for description
  const generateDescription = async (index) => {
    const exp = data[index];

    // small guard (avoid useless API call)
    if (!exp.position || !exp.company) {
      return toast.error("Add company & position first");
    }

    setGeneratingIndex(index);

    const prompt = `enhance this job description ${exp.description} for the position of ${exp.position} at ${exp.company}.`;

    try {
      const res = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      // update only description
      updateExperience(index, "description", res.data.enhancedContent);

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Briefcase className="size-5" />
            Experience
          </h3>
          <p className="text-sm text-slate-500">
            Add your work experience here.
          </p>
        </div>

        <button
          onClick={addExperience}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-slate-500">
          <Briefcase className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p>No experience added yet</p>
          <p className="text-sm">Click "Add" to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-slate-800">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="size-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                />
                <span className="text-sm text-slate-700">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Job Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="inline-flex h-8 items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-3 text-xs font-medium text-violet-700 transition hover:bg-violet-100 disabled:opacity-60"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}

                    {generatingIndex === index
                      ? "Enhancing..."
                      : "Enhance with AI"}
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  rows={4}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Describe your work..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;