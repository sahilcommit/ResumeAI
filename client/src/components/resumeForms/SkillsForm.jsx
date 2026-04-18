import { Plus, Sparkles, Trash2 } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {
  const displayGroups = (() => {
    if (!Array.isArray(data) || data.length === 0) {
      return [{ category: "", items: [""] }];
    }

    if (data.every((skill) => typeof skill === "string")) {
      return [
        {
          category: "Skills",
          items: data.length > 0 ? data : [""],
        },
      ];
    }

    return data.map((group) => ({
      category: group?.category || "",
      items:
        Array.isArray(group?.items) && group.items.length > 0
          ? group.items
          : [""],
    }));
  })();

  const persistGroups = (groups) => {
    const normalizedGroups = groups.map((group) => ({
      category: group.category || "",
      items: Array.isArray(group.items) && group.items.length > 0
        ? group.items
        : [""],
    }));

    onChange(normalizedGroups);
  };

  const addSkillGroup = () => {
    persistGroups([...displayGroups, { category: "", items: [""] }]);
  };

  const removeSkillGroup = (indexToRemove) => {
    const updated = displayGroups.filter((_, index) => index !== indexToRemove);
    persistGroups(updated);
  };

  const updateSkillCategory = (index, value) => {
    const updated = [...displayGroups];
    updated[index] = { ...updated[index], category: value };
    persistGroups(updated);
  };

  const addSkillInput = (groupIndex) => {
    const updated = [...displayGroups];
    updated[groupIndex] = {
      ...updated[groupIndex],
      items: [...updated[groupIndex].items, ""],
    };
    onChange(updated);
  };

  const updateSkillItem = (groupIndex, itemIndex, value) => {
    const updated = [...displayGroups];
    const nextItems = [...updated[groupIndex].items];
    nextItems[itemIndex] = value;
    updated[groupIndex] = { ...updated[groupIndex], items: nextItems };
    persistGroups(updated);
  };

  const removeSkillItem = (groupIndex, itemIndex) => {
    const updated = [...displayGroups];
    const nextItems = updated[groupIndex].items.filter(
      (_, index) => index !== itemIndex
    );
    updated[groupIndex] = {
      ...updated[groupIndex],
      items: nextItems.length > 0 ? nextItems : [""],
    };
    persistGroups(updated);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
        <p className="text-sm text-slate-500">
          Group your skills by category so templates can show them clearly.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Skill Categories
            </h4>
            <p className="text-xs text-slate-500">
              Add a category, then add multiple skills under it.
            </p>
          </div>

          <button
            type="button"
            onClick={addSkillGroup}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            <Plus className="size-4" />
            Add More
          </button>
        </div>

        <div className="space-y-4">
          {displayGroups.map((group, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  placeholder="Category (e.g. Programming)"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  value={group.category || ""}
                  onChange={(e) => updateSkillCategory(index, e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => removeSkillGroup(index)}
                  disabled={displayGroups.length === 1}
                  className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Remove skill group ${index + 1}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]"
                  >
                    <input
                      type="text"
                      placeholder="Skill (e.g. JavaScript)"
                      className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      value={item}
                      onChange={(e) =>
                        updateSkillItem(index, itemIndex, e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() => removeSkillItem(index, itemIndex)}
                      disabled={group.items.length === 1}
                      className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Remove skill ${itemIndex + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => addSkillInput(index)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <Plus className="size-4" />
                  Add Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 py-6 text-center text-slate-500">
          <Sparkles className="mx-auto mb-2 h-10 w-10 text-slate-300" />
          <p>Start by typing a category and its skills above.</p>
          <p className="text-sm">
            Example category: `Frameworks`, then add `Angular`, `ReactJS`, `TailwindCSS`.
          </p>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-sm text-slate-700">
          <strong>Tip:</strong> Example output: `Programming: C++, JavaScript, TypeScript, SQL`
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
