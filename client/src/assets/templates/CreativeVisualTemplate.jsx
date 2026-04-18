import { Award, ExternalLink } from "lucide-react";
import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
  ResumeDescription,
  ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const CreativeVisualTemplate = ({ data, accentColor }) => {

  // converting "YYYY-MM" → "MMM YYYY"
  // keeping it consistent across whole resume
  const formatDate = (dateStr) => {
    if (!dateStr) return ""; // if no date, skip
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const customLinks = getCustomLinks(data.personal_info);
  const skillGroups = normalizeSkillGroups(data.skills);

  return (
    <div className="max-w-4xl mx-auto p-7 bg-white text-gray-800 leading-relaxed">

      {/* ================= HEADER ================= */}
      <header className="mb-1 text-center">

        {/* name */}
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* profession */}
        <p className="text-sm text-zinc-600">
          {data.personal_info?.profession || ""}
        </p>
      </header>

      {/* contact info row */}
      <div className="flex flex-wrap justify-center gap-1.5 text-sm text-gray-600">

        {/* email */}
        {data.personal_info?.email && (
          <a target="_blank" href={`mailto:${data.personal_info?.email}`}>
            <span>{data.personal_info.email}</span>
          </a>
        )}

        {/* phone */}
        {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}

        {/* location */}
        {data.personal_info?.location && (
          <span>{data.personal_info.location}</span>
        )}

        {/* linkedin */}
        {data.personal_info?.linkedin && (
          <a
            target="_blank"
            href={
              data.personal_info?.linkedin.startsWith("https://")
                ? data.personal_info?.linkedin
                : `https://${data.personal_info?.linkedin}` // fixing missing https
            }
          >
            <span className="break-all">
              {data.personal_info.linkedin.split("https://")[1]
                ? data.personal_info.linkedin.split("https://")[1]
                : data.personal_info.linkedin}
            </span>
          </a>
        )}

        {/* github */}
        {data.personal_info?.github && (
          <a
            target="_blank"
            href={
              data.personal_info?.github.startsWith("https://")
                ? data.personal_info?.github
                : `https://${data.personal_info?.github}`
            }
          >
            <span className="break-all">
              {data.personal_info.github.split("https://")[1]
                ? data.personal_info.github.split("https://")[1]
                : data.personal_info.github}
            </span>
          </a>
        )}

        {/* website */}
        {data.personal_info?.website && (
          <a
            target="_blank"
            href={
              data.personal_info?.website.startsWith("https://")
                ? data.personal_info?.website
                : `https://${data.personal_info?.website}`
            }
          >
            <span className="break-all">
              {data.personal_info.website.split("https://")[1]
                ? data.personal_info.website.split("https://")[1]
                : data.personal_info.website}
            </span>
          </a>
        )}

        {customLinks.map((link, index) => (
          <a
            key={`${link.label}-${index}`}
            target="_blank"
            rel="noopener noreferrer"
            href={normalizeUrl(link.url)}
          >
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* ================= SUMMARY ================= */}
      <section className="mb-1">
        {data.professional_summary && (
          <div>

            {/* small visual touch → left border */}
            <h2
              className="text-lg font-semibold"
              style={{
                borderLeft: `4px solid ${accentColor}`,
                paddingLeft: "10px",
              }}
            >
              Summary
            </h2>

            <p className="text-gray-700 text-sm">
              {data.professional_summary}
            </p>
          </div>
        )}
      </section>

      {/* ================= EXPERIENCE (TIMELINE STYLE) ================= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-1">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Experience Timeline
          </h2>

          <div className="space-y-1">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="flex gap-2 items-start">

                {/* timeline dots + line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: accentColor }}
                  />

                  {/* vertical line (except last item) */}
                  {idx !== data.experience.length - 1 && (
                    <div
                      className="w-px h-full"
                      style={{ background: "#e5e7eb" }}
                    />
                  )}
                </div>

                <div>
                  <ResumeItemHeader
                    title={exp.position}
                    date={`${formatDate(exp.start_date)} - ${
                      exp.is_current ? "Present" : formatDate(exp.end_date)
                    }`}
                    titleClassName="font-semibold"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm"
                  />

                  {exp.company && (
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  )}

                  <ResumeDescription
                    description={exp.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.project && data.project.length > 0 && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Featured Projects
          </h2>

          <div>
            {data.project.map((p, i) => (
              <div
                key={i}
                className="p-2 pt-1 rounded-md border-l-4"
                style={{ borderColor: accentColor }} // highlight left border
              >
                <ResumeItemHeader
                  title={p.name}
                  date={formatDate(p.date)}
                  url={p.link}
                  linkLabel={p.linkLabel}
                  linkFallback="Live Demo"
                  titleClassName="font-semibold"
                  dateClassName="text-sm text-gray-500 whitespace-nowrap"
                  linkClassName="text-sm text-gray-600"
                />

                <ResumeDescription
                  description={p.description}
                  className="text-sm text-gray-600"
                  listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-600"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && data.education.length > 0 && (
        <section className="mb-1">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Education
          </h2>

          <div className="space-y-1">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">

                {/* left */}
                <div>
                  <div className="font-medium">
                    {formatEducationTitle(edu.degree, edu.field)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.institution}
                  </div>
                </div>

                {/* right date */}
                <div className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {skillGroups.length > 0 && (
        <section className="mb-1">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Skills & Tools
          </h2>

          {/* small pill style */}
          <div className="flex flex-wrap gap-1">
            {skillGroups.flatMap((group) => group.items).map((s, idx) => (
              <span
                key={idx}
                className="text-sm px-2 py-0.5 border rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {data.certification && data.certification.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Certifications
          </h2>

          <div className="space-y-1">
            {data.certification.map((cert, index) => {
              return (
                <div key={index} className="flex space-x-2">

                  {/* icon for visual feel */}
                  <Award
                    size={16}
                    className="mt-1 shrink-0"
                    style={{ color: accentColor }}
                  />

                  <div className="grow">
                    <ResumeItemHeader
                      title={cert.certificate_name}
                      date={formatDate(cert.issue_date)}
                      url={cert.credential_url}
                      linkLabel={cert.linkLabel}
                      linkFallback="View Certificate"
                      titleClassName="font-medium text-gray-900"
                      dateClassName="text-sm text-gray-500 whitespace-nowrap"
                      linkClassName="text-sm text-gray-600"
                    />

                    {cert.issuer && (
                      <p className="text-sm italic text-gray-900">{cert.issuer}</p>
                    )}

                    <ResumeDescription
                      description={cert.description}
                      className="text-sm italic text-gray-500"
                      listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            Achievements
          </h2>

          <div>
            {data.achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-2 pt-1 rounded-md border-l-4"
                style={{ borderColor: accentColor }}
              >
                <ResumeItemHeader
                  title={achievement.title}
                  date={formatDate(achievement.date)}
                  url={achievement.link}
                  linkLabel={achievement.linkLabel}
                  titleClassName="font-semibold"
                  dateClassName="text-sm text-gray-500 whitespace-nowrap"
                  linkClassName="text-sm font-normal text-gray-600"
                />

                <ResumeDescription
                  description={achievement.description}
                  className="text-sm text-gray-600"
                  listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-600"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CreativeVisualTemplate;
