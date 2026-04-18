import { getResumeLink } from "../../../utils/resumeLinks";
import { getDescriptionPoints } from "./ATSResumeHelpers";

export const ATSSection = ({ title, children, accentColor }) => {
  if (!children) return null;

  return (
    <section className="mb-4">
      <h2
        className="mb-2 border-b border-slate-300 pb-1 text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
};

export const ATSBullets = ({ points }) => {
  if (!Array.isArray(points) || points.length === 0) return null;

  return (
    <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-700">
      {points.map((point, index) => (
        <li key={`${point}-${index}`}>{point}</li>
      ))}
    </ul>
  );
};

export const ATSInlineLink = ({
  url,
  linkLabel,
  fallback = "View Link",
}) => {
  const link = getResumeLink({ url, linkLabel, fallback });
  if (!link) return null;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-slate-400">|</span>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium text-slate-600 underline underline-offset-2"
      >
        {link.label}
      </a>
    </span>
  );
};

export const ATSResumeItem = ({
  title,
  date,
  description,
  bullets,
  url,
  linkLabel,
  linkFallback,
  subtitle,
}) => {
  const points =
    Array.isArray(bullets) && bullets.length > 0
      ? bullets
      : getDescriptionPoints(description);

  const hasBody = subtitle || points.length > 0;

  if (!title && !date && !url && !hasBody) return null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {title && <p className="font-semibold text-slate-900">{title}</p>}
            <ATSInlineLink
              url={url}
              linkLabel={linkLabel}
              fallback={linkFallback}
            />
          </div>
        </div>

        {date && (
          <p className="shrink-0 whitespace-nowrap text-right text-xs text-slate-500">
            {date}
          </p>
        )}
      </div>

      {subtitle && <p className="mt-0.5 text-slate-600">{subtitle}</p>}
      <ATSBullets points={points} />
    </div>
  );
};
