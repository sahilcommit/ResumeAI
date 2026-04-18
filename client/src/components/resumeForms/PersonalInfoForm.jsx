import {
  BriefcaseBusiness,
  AtSign,
  Globe,
  Link,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
  showImageUpload = true,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const customLinks = data.custom_links || [];

  const addCustomLink = () => {
    handleChange("custom_links", [...customLinks, { label: "", url: "" }]);
  };

  const updateCustomLink = (index, field, value) => {
    const updatedLinks = [...customLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange("custom_links", updatedLinks);
  };

  const removeCustomLink = (index) => {
    handleChange(
      "custom_links",
      customLinks.filter((_, i) => i !== index)
    );
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "LinkedIn Profile", icon: Link, type: "url" },
    { key: "github", label: "GitHub Profile", icon: AtSign, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Basic details that will appear at the top of your resume.
        </p>
      </div>

      {showImageUpload && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <label className="cursor-pointer">
            {data.image ? (
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                alt="user"
                className="size-16 rounded-full object-cover ring-2 ring-slate-200 transition hover:opacity-80"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition hover:bg-slate-100">
                <User className="size-6" />
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg"
              hidden
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </label>

          {typeof data.image === "object" && (
            <div className="flex flex-col text-sm">
              <span className="font-medium text-slate-700">
                Remove Background
              </span>

              <label className="relative mt-2 inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={removeBackground}
                  onChange={() => setRemoveBackground((prev) => !prev)}
                />
                <div className="h-5 w-10 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500"></div>
                <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
              </label>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon className="size-4" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                type={field.type}
                required={field.required}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          );
        })}
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Additional Links
            </h4>
            <p className="text-xs text-slate-500">
              Add LeetCode, GFG, portfolio, or any other profile link.
            </p>
          </div>

          <button
            type="button"
            onClick={addCustomLink}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            <Plus className="size-4" />
            Add Link
          </button>
        </div>

        {customLinks.map((link, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]"
          >
            <input
              type="text"
              value={link.label || ""}
              onChange={(e) =>
                updateCustomLink(index, "label", e.target.value)
              }
              placeholder="Label (e.g. LeetCode)"
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />

            <input
              type="url"
              value={link.url || ""}
              onChange={(e) => updateCustomLink(index, "url", e.target.value)}
              placeholder="https://your-link.com"
              className="h-11 rounded-xl border border-slate-300 px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />

            <button
              type="button"
              onClick={() => removeCustomLink(index)}
              className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
              aria-label={`Remove custom link ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
