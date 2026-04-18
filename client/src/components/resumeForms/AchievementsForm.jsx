import { Award, Plus, Trash2 } from "lucide-react";

const AchievementsForm = ({ data = [], onChange }) => {
  const addAchievement = () => {
    onChange([
      ...data,
      {
        title: "",
        date: "",
        link: "",
        linkLabel: "",
        description: "",
      },
    ]);
  };

  const removeAchievement = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAchievement = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
          <p className="text-sm text-slate-500">
            Add awards, rankings, recognitions, or notable accomplishments.
          </p>
        </div>

        <button
          onClick={addAchievement}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <Plus className="size-4" />
          Add Achievement
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-slate-500">
          <Award className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p>No achievements added yet.</p>
          <p className="text-sm">Click "Add Achievement" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((achievement, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-slate-800">
                  Achievement #{index + 1}
                </h4>

                <button
                  className="rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeAchievement(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={achievement.title || ""}
                  onChange={(e) =>
                    updateAchievement(index, "title", e.target.value)
                  }
                  type="text"
                  placeholder="Achievement Title"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={achievement.date || ""}
                  onChange={(e) =>
                    updateAchievement(index, "date", e.target.value)
                  }
                  type="month"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={achievement.link || ""}
                  onChange={(e) =>
                    updateAchievement(index, "link", e.target.value)
                  }
                  type="url"
                  placeholder="Achievement Link"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={achievement.linkLabel || ""}
                  onChange={(e) =>
                    updateAchievement(index, "linkLabel", e.target.value)
                  }
                  type="text"
                  placeholder="Link Label (optional)"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <textarea
                value={achievement.description || ""}
                onChange={(e) =>
                  updateAchievement(index, "description", e.target.value)
                }
                rows={4}
                placeholder="Describe your achievement..."
                className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsForm;
