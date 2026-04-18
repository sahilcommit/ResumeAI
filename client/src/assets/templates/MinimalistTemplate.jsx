import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
  ResumeDescription,
  ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const MinimalistTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [year, month] = dateStr.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
  
    const formatLinkText = (url) => {
      if (!url) return "";
      return url.replace(/^https?:\/\//, "");
    };
  
    const getSafeLink = (url) => {
      if (!url) return "";
      return url.startsWith("http") ? url : `https://${url}`;
    };
  
    const customLinks = getCustomLinks(data.personal_info);
    const skillGroups = normalizeSkillGroups(data.skills);

    return (
      <div className="max-w-4xl mx-auto p-7 bg-white text-gray-800 leading-relaxed">
        {/* Header */}
        <header className="text-center mb-1">
          <h1 className="text-3xl font-light" style={{ color: accentColor }}>
            {data.personal_info?.full_name || "Your Name"}
          </h1>
  
          <p className="text-sm text-zinc-600">
            {data.personal_info?.profession || ""}
          </p>
  
          <div className="flex flex-wrap justify-center gap-1.5 text-gray-600 text-sm">
            {data.personal_info?.email && (
              <a
                href={`mailto:${data.personal_info.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.personal_info.email}
              </a>
            )}
  
            {data.personal_info?.phone && (
              <span>{data.personal_info.phone}</span>
            )}
  
            {data.personal_info?.location && (
              <span>{data.personal_info.location}</span>
            )}
  
            {data.personal_info?.linkedin && (
              <a
                href={getSafeLink(data.personal_info.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatLinkText(data.personal_info.linkedin)}
              </a>
            )}
  
            {data.personal_info?.github && (
              <a
                href={getSafeLink(data.personal_info.github)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatLinkText(data.personal_info.github)}
              </a>
            )}
  
            {data.personal_info?.website && (
              <a
                href={getSafeLink(data.personal_info.website)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatLinkText(data.personal_info.website)}
              </a>
            )}

            {customLinks.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </header>
  
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-1">
            <h2
              className="font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm">
              {data.professional_summary}
            </p>
          </section>
        )}
  
        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-1">
            <h2
              className="font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Professional Experience
            </h2>
  
            <div className="space-y-1">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <ResumeItemHeader
                    title={exp.position}
                    date={`${formatDate(exp.start_date)} - ${
                      exp.is_current ? "Present" : formatDate(exp.end_date)
                    }`}
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
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
              ))}
            </div>
          </section>
        )}
  
        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
  
            <ul className="space-y-1">
              {data.project.map((p, i) => (
                <li key={i}>
                  <ResumeItemHeader
                    title={p.name}
                    date={formatDate(p.date)}
                    url={p.link}
                    linkLabel={p.linkLabel}
                    linkFallback="Live Demo"
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />

                  <ResumeDescription
                    description={p.description}
                    className="text-sm text-gray-600"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-600"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
  
        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Education
            </h2>
  
            <div className="space-y-1">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {formatEducationTitle(edu.degree, edu.field)}
                    </div>
  
                    <div className="text-sm text-gray-600">
                      {edu.institution}
                    </div>
                  </div>
  
                  <div className="text-sm text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
  
        {/* Skills */}
        {skillGroups.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Core Skills
            </h2>
  
            <div className="flex flex-wrap gap-1 text-sm text-gray-700">
              {skillGroups.flatMap((group) => group.items).map((s, idx) => (
                <div key={idx} className="px-2 py-0.5 border rounded">
                  {s}
                </div>
              ))}
            </div>
          </section>
        )}
  
        {/* Certifications */}
        {data.certification?.length > 0 && (
          <section>
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Certifications
            </h2>
  
            <div className="space-y-1">
              {data.certification.map((cert, index) => (
                <div key={index}>
                  <ResumeItemHeader
                    title={cert.certificate_name}
                    date={formatDate(cert.issue_date)}
                    url={cert.credential_url}
                    linkLabel={cert.linkLabel}
                    linkFallback="View Certificate"
                    titleClassName="font-medium text-gray-900"
                    dateClassName="text-sm text-gray-600 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />

                  {cert.issuer && (
                    <p className="text-sm italic text-gray-600">{cert.issuer}</p>
                  )}

                  <ResumeDescription
                    description={cert.description}
                    className="text-sm text-gray-500"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.achievements?.length > 0 && (
          <section className="mt-1">
            <h2
              className="text-sm font-semibold uppercase"
              style={{ color: accentColor }}
            >
              Achievements
            </h2>

            <div className="space-y-1">
              {data.achievements.map((achievement, index) => (
                <div key={index}>
                  <ResumeItemHeader
                    title={achievement.title}
                    date={formatDate(achievement.date)}
                    url={achievement.link}
                    linkLabel={achievement.linkLabel}
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-600 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />

                  <ResumeDescription
                    description={achievement.description}
                    className="text-sm text-gray-500"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };
  
  export default MinimalistTemplate;
