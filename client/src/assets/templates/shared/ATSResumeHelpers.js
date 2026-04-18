export const formatResumeDate = (dateStr) => {
  if (!dateStr) return "";

  // Most dates in the app are stored as YYYY-MM strings.
  // This extra parsing keeps old/demo data readable too if a full Date string slips in.
  const rawValue = String(dateStr).trim();

  const yearMonthMatch = rawValue.match(/^(\d{4})-(\d{2})$/);
  if (yearMonthMatch) {
    const [, year, month] = yearMonthMatch;

    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
      }
    );
  }

  const fullDate = new Date(rawValue);
  if (!Number.isNaN(fullDate.getTime())) {
    return fullDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  return rawValue;
};

export const getDescriptionPoints = (value = "") =>
  String(value || "")
    .split("\n")
    .map((point) => point.trim())
    .filter(Boolean);
