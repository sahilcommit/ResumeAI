import { getResumeLink } from "../../../utils/resumeLinks";
import { getDescriptionPoints } from "./ATSResumeHelpers";

export const ResumeInlineLink = ({
  url,
  linkLabel,
  fallback = "View Link",
  className = "",
}) => {
  const link = getResumeLink({ url, linkLabel, fallback });
  if (!link) return null;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      | {link.label}
    </a>
  );
};

export const ResumeItemHeader = ({
  title,
  date,
  url,
  linkLabel,
  linkFallback = "View Link",
  titleClassName = "font-semibold",
  dateClassName = "text-sm text-gray-500 whitespace-nowrap",
  linkClassName = "text-sm text-gray-500",
  className = "",
}) => {
  if (!title && !date && !url) return null;

  return (
    <div className={`flex items-start justify-between gap-4 ${className}`.trim()}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {title && <span className={titleClassName}>{title}</span>}
          <ResumeInlineLink
            url={url}
            linkLabel={linkLabel}
            fallback={linkFallback}
            className={linkClassName}
          />
        </div>
      </div>

      {date && <span className={dateClassName}>{date}</span>}
    </div>
  );
};

export const ResumeDescription = ({
  description,
  asBullets = false,
  className = "text-sm text-gray-700",
  listClassName = "mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700",
}) => {
  const points = getDescriptionPoints(description);
  if (points.length === 0) return null;

  if (asBullets || points.length > 1) {
    return (
      <ul className={listClassName}>
        {points.map((point, index) => (
          <li key={`${point}-${index}`}>{point}</li>
        ))}
      </ul>
    );
  }

  return <p className={className}>{points[0]}</p>;
};
