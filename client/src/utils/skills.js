const CATEGORY_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  tools: "Tools",
  fundamentals: "Fundamentals",
};

const normalizeCategoryName = (value = "") => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const normalizedKey = raw.toLowerCase().replace(/\s+/g, "");
  return CATEGORY_LABELS[normalizedKey] || raw;
};

export const normalizeSkillGroups = (skills = []) => {
  if (!skills) return [];

  if (!Array.isArray(skills) && typeof skills === "object") {
    return Object.entries(skills)
      .map(([category, items]) => ({
        category: normalizeCategoryName(category),
        items: Array.isArray(items)
          ? items.map((item) => String(item || "").trim()).filter(Boolean)
          : String(items || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
      }))
      .filter((group) => group.category && group.items.length > 0);
  }

  if (!Array.isArray(skills)) return [];

  if (skills.every((skill) => typeof skill === "string")) {
    if (skills.length === 0) return [];

    return [
      {
        category: "Skills",
        items: skills.map((skill) => String(skill || "").trim()).filter(Boolean),
      },
    ].filter((group) => group.items.length > 0);
  }

  return skills
    .map((group) => ({
      category: normalizeCategoryName(group?.category),
      items: (
        Array.isArray(group?.items)
          ? group.items
          : String(group?.items || "")
              .split(",")
              .map((item) => item.trim())
      )
        .map((item) => String(item || "").trim())
        .filter(Boolean),
    }))
    .filter((group) => group.category && group.items.length > 0);
};

export const formatSkillLine = (group) => {
  const items = Array.isArray(group?.items) ? group.items.filter(Boolean) : [];
  if (!group?.category && items.length === 0) return "";
  if (!group?.category) return items.join(", ");
  if (items.length === 0) return group.category;
  return `${group.category}: ${items.join(", ")}`;
};

export const flattenSkillItems = (skills = []) =>
  normalizeSkillGroups(skills).flatMap((group) => group.items);
