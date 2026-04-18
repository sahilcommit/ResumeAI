import { Plus, ShieldCheck, Trash2 } from "lucide-react";

const CertificationForm = ({ data, onChange }) => {

  // adds a new empty certification block
  const addCertification = () => {
    const newCertification = {
      certificate_name: "",
      description: "",
      issuer: "",
      issue_date: "",
      credential_url: "",
      linkLabel: "",
    };

    // spreading old + new one
    onChange([...data, newCertification]);
  };

  // remove based on index (simple filter)
  const removeCertification = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // updating specific field inside specific certification
  const updateCertification = (index, field, value) => {
    const updated = [...data];

    // clone + update only that field
    updated[index] = { ...updated[index], [field]: value };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            Certification
          </h3>

          <p className="text-sm text-slate-500">
            Add your certification details
          </p>
        </div>

        <button
          onClick={addCertification}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
        >
          <Plus className="size-4" />
          Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-slate-500">
          <ShieldCheck className="mx-auto mb-3 h-12 w-12 text-slate-300" />

          <p>No certification added yet.</p>
          <p className="text-sm">
            Click "Add Certification" to get started.
          </p>
        </div>
      ) : (

        <div className="space-y-4">
          {data.map((certification, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-slate-800">
                  Certification #{index + 1}
                </h4>

                <button
                  className="rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={certification.certificate_name || ""}
                  onChange={(e) =>
                    updateCertification(index, "certificate_name", e.target.value)
                  }
                  type="text"
                  placeholder="Certificate Name"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={certification.issuer || ""}
                  onChange={(e) =>
                    updateCertification(index, "issuer", e.target.value)
                  }
                  type="text"
                  placeholder="Issuer"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={certification.credential_url || ""}
                  onChange={(e) =>
                    updateCertification(index, "credential_url", e.target.value)
                  }
                  type="text"
                  placeholder="Credential URL"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={certification.linkLabel || ""}
                  onChange={(e) =>
                    updateCertification(index, "linkLabel", e.target.value)
                  }
                  type="text"
                  placeholder="Link Label (optional)"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />

                <input
                  value={certification.issue_date || ""}
                  onChange={(e) =>
                    updateCertification(index, "issue_date", e.target.value)
                  }
                  type="month"
                  className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <input
                value={certification.description || ""}
                onChange={(e) =>
                  updateCertification(index, "description", e.target.value)
                }
                type="text"
                placeholder="Description"
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationForm;
