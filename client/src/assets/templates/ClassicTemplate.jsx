import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { getAllProfileLinks } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
ResumeDescription,
ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const ClassicTemplate = ({ data, accentColor }) => {
  // converting "2024-05" → "May 2024"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const [year, month] = dateStr.split("-");
    if (!month || !year) return dateStr;

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const profileLinks = getAllProfileLinks(data.personal_info);
  const skillGroups = normalizeSkillGroups(data.skills);

  return (
    <div className="max-w-4xl mx-auto p-7 bg-white text-gray-800 leading-relaxed">
      
      {/* ---------------- HEADER ---------------- */}
      <header
        className="text-center mb-2 pb-2 border-b-2"
        style={{ borderColor: accentColor }}
      >
        {/* name */}
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* profession (optional) */}
        <p className="uppercase text-zinc-600 font-medium text-xs tracking-widest mb-1">
          {data?.personal_info?.profession || ""}
        </p>

        {/* contact info */}
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          
          {/* email */}
          {data.personal_info?.email && (
            <a
              href={`mailto:${data.personal_info.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Mail className="size-4" />
              {data.personal_info.email}
            </a>
          )}

          {/* phone */}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </div>
          )}

          {/* location */}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </div>
          )}

          {profileLinks.map((link, index) => (
            <a
              key={`${link.label}-${index}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLink className="size-4" />
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* ---------------- SUMMARY ---------------- */}
      {data.professional_summary && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>

          <p className="text-gray-700 text-sm">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* ---------------- EXPERIENCE ---------------- */}
      {data.experience?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >
                <ResumeItemHeader
                  title={exp.position}
                  date={`${formatDate(exp.start_date)} - ${
                    exp.is_current ? "Present" : formatDate(exp.end_date)
                  }`}
                  titleClassName="font-semibold"
                  dateClassName="text-xs text-gray-500 whitespace-nowrap"
                  linkClassName="text-sm"
                />

                {exp.company && (
                  <p className="text-sm text-gray-600">{exp.company}</p>
                )}

                {/* description */}
                <ResumeDescription
                  description={exp.description}
                  className="mt-1 text-sm text-gray-700"
                  listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- PROJECTS ---------------- */}
      {data.project?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            PROJECTS
          </h2>

          <div className="space-y-2">
            {data.project.map((proj, index) => (
              <div key={index}>
                <ResumeItemHeader
                  title={proj.name}
                  date={formatDate(proj.date)}
                  url={proj.link}
                  linkLabel={proj.linkLabel}
                  linkFallback="Live Demo"
                  titleClassName="font-semibold"
                  dateClassName="text-xs text-gray-500 whitespace-nowrap"
                  linkClassName="text-sm"
                />

                <ResumeDescription
                  description={proj.description}
                  className="text-sm text-gray-600"
                  listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-600"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- EDUCATION ---------------- */}
      {data.education?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          {data.education.map((edu, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <h3 className="font-semibold">
                  {formatEducationTitle(edu.degree, edu.field)}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.institution}
                </p>
                {edu.gpa && (
                  <p className="text-sm">GPA: {edu.gpa}</p>
                )}
              </div>

              <p className="text-sm text-gray-500">
                {formatDate(edu.graduation_date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ---------------- SKILLS ---------------- */}
      {skillGroups.length > 0 && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          <div className="space-y-1 text-sm">
            {skillGroups.map((group, index) => (
              <p key={index} className="text-gray-700">
                <span className="font-semibold">{group.category}:</span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            ACHIEVEMENTS
          </h2>

          <div className="space-y-2">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                <ResumeItemHeader
                  title={achievement.title}
                  date={formatDate(achievement.date)}
                  url={achievement.link}
                  linkLabel={achievement.linkLabel}
                  titleClassName="font-semibold"
                  dateClassName="text-sm text-gray-500 whitespace-nowrap"
                  linkClassName="text-sm"
                />

                <ResumeDescription
                  description={achievement.description}
                  className="mt-1 text-sm text-gray-700"
                  listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CERTIFICATIONS ---------------- */}
      {data.certification?.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
            CERTIFICATIONS
          </h2>

          {data.certification.map((cert, index) => (
            <div key={index} className="text-sm">
              <ResumeItemHeader
                title={cert.certificate_name}
                date={formatDate(cert.issue_date)}
                url={cert.credential_url}
                linkLabel={cert.linkLabel}
                linkFallback="View Certificate"
                titleClassName="font-medium"
                dateClassName="text-sm text-gray-500 whitespace-nowrap"
                linkClassName="text-sm"
              />

              {cert.issuer && (
                <p className="italic text-gray-600">{cert.issuer}</p>
              )}

              {/* description */}
              <ResumeDescription
                description={cert.description}
                className="text-gray-600"
                listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-600"
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
