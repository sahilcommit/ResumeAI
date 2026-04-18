import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data, onChange }) => {

  // add new empty education block
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    // push new entry
    onChange([...data, newEducation]);
  };

  // remove specific education by index
  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // update a single field inside one education item
  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <GraduationCap className="size-5" />
            Education
          </h3>
          <p className="text-sm text-slate-500">
            Add your education details here.
          </p>
        </div>

        <button
          onClick={addEducation}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-slate-500">
          <GraduationCap className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p>No education added yet</p>
          <p className="text-sm">Click "Add" to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-slate-800">
                  Education #{index + 1}
                </h4>

                <button
                  onClick={() => removeEducation(index)}
                  className="rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  type="text"
                  placeholder="Institution Name"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree (B.Tech, MSc, etc)"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  type="month"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <input
                value={education.gpa || ""}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                type="text"
                placeholder="GPA (optional)"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;