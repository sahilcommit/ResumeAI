import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {

  // add new empty project
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      date: "",
      link: "",
      linkLabel: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  // remove project by index
  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // update specific field of a project
  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
          <p className="text-sm text-slate-500">
            Add your projects here.
          </p>
        </div>

        <button
          onClick={addProject}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-slate-500">
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add" to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-slate-800">
                  Project #{index + 1}
                </h4>

                <button
                  onClick={() => removeProject(index)}
                  className="rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  type="text"
                  placeholder="Project Name"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  type="text"
                  placeholder="Project Type"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={project.date || ""}
                  onChange={(e) =>
                    updateProject(index, "date", e.target.value)
                  }
                  type="month"
                  placeholder="Project Date"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={project.link || ""}
                  onChange={(e) =>
                    updateProject(index, "link", e.target.value)
                  }
                  type="text"
                  placeholder="Project Link"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={project.linkLabel || ""}
                  onChange={(e) =>
                    updateProject(index, "linkLabel", e.target.value)
                  }
                  type="text"
                  placeholder="Link Label (optional)"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={4}
                placeholder="Describe your project..."
                className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
