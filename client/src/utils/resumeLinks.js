export const normalizeUrl = (url = "") => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

export const getLinkDisplayLabel = (url = "", linkLabel = "", fallback = "View Link") => {
  if (linkLabel?.trim()) return linkLabel.trim();

  const normalizedUrl = normalizeUrl(url);

  try {
    const { hostname } = new URL(normalizedUrl);
    const domain = hostname.replace(/^www\./, "").toLowerCase();

    if (domain.includes("github.com")) return "GitHub Repo";
    if (domain.includes("leetcode.com")) return "LeetCode Profile";
    if (domain.includes("geeksforgeeks.org")) return "GFG Profile";
    if (domain.includes("vercel.app") || domain.includes("netlify.app")) {
      return "Live Demo";
    }
  } catch {
    return fallback;
  }

  return fallback;
};

export const getResumeLink = ({
  url = "",
  linkLabel = "",
  fallback = "View Link",
}) => {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) return null;

  return {
    url: normalizedUrl,
    label: getLinkDisplayLabel(normalizedUrl, linkLabel, fallback),
  };
};

export const getCustomLinks = (personalInfo = {}) =>
  (personalInfo.custom_links || []).filter((link) => link?.label && link?.url);

export const getAllProfileLinks = (personalInfo = {}) =>
  [
    personalInfo.linkedin && {
      label: "LinkedIn",
      url: normalizeUrl(personalInfo.linkedin),
    },
    personalInfo.github && {
      label: "GitHub",
      url: normalizeUrl(personalInfo.github),
    },
    personalInfo.website && {
      label: "Website",
      url: normalizeUrl(personalInfo.website),
    },
    ...getCustomLinks(personalInfo).map((link) => ({
      label: link.label,
      url: normalizeUrl(link.url),
    })),
  ]
    .filter(Boolean)
    .filter((link) => link.url);
