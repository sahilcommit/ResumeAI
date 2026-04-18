export const formatEducationTitle = (degree = "", field = "") =>
  [degree, field ? `in ${field}` : ""].filter(Boolean).join(" ");
