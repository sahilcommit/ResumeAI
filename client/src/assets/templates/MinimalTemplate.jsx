import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
  ResumeDescription,
  ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const MinimalTemplate = ({ data, accentColor }) => {
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
  
    const customLinks = getCustomLinks(data.personal_info);
    const skillGroups = normalizeSkillGroups(data.skills);

    return (
      <div className="max-w-4xl mx-auto p-7 bg-white text-gray-900 font-light">
        {/* Header */}
        <header className="mb-1">
          <h1 className="text-4xl font-thin mb-1 tracking-wide">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
  
          <p className="uppercase text-gray-700 font-medium text-sm tracking-widest">
            {data?.personal_info?.profession || ""}
          </p>
  
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
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
                href={
                  data.personal_info.linkedin.startsWith("http")
                    ? data.personal_info.linkedin
                    : `https://${data.personal_info.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatLinkText(data.personal_info.linkedin)}
              </a>
            )}
  
            {data.personal_info?.github && (
              <a
                href={
                  data.personal_info.github.startsWith("http")
                    ? data.personal_info.github
                    : `https://${data.personal_info.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatLinkText(data.personal_info.github)}
              </a>
            )}
  
            {data.personal_info?.website && (
              <a
                href={
                  data.personal_info.website.startsWith("http")
                    ? data.personal_info.website
                    : `https://${data.personal_info.website}`
                }
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
              className="text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}
  
        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
  
            <div className="space-y-2">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <ResumeItemHeader
                    title={exp.position}
                    date={`${formatDate(exp.start_date)} - ${
                      exp.is_current ? "Present" : formatDate(exp.end_date)
                    }`}
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />
  
                  <p className="text-gray-600 text-xs">{exp.company}</p>
  
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
              className="text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
  
            <div className="space-y-1">
              {data.project.map((proj, index) => (
                <div key={index}>
                  <ResumeItemHeader
                    title={proj.name}
                    date={formatDate(proj.date)}
                    url={proj.link}
                    linkLabel={proj.linkLabel}
                    linkFallback="Live Demo"
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
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
  
        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              Education
            </h2>
  
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline"
              >
                <div>
                  <h3 className="font-medium">
                    {formatEducationTitle(edu.degree, edu.field)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
  
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </section>
        )}
  
        {/* Skills */}
        {skillGroups.length > 0 && (
          <section className="mb-1">
            <h2
              className="text-sm uppercase tracking-widest font-medium"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
  
            <div className="space-y-1 text-gray-700 text-sm">
              {skillGroups.map((group, index) => (
                <p key={index}>
                  <span className="font-semibold">{group.category}:</span>{" "}
                  {group.items.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}
  
        {/* Certifications */}
        {data.certification?.length > 0 && (
          <section>
            <h2
              className="text-sm uppercase tracking-widest font-semibold"
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
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />

                  {cert.issuer && (
                    <p className="text-sm italic text-gray-600">{cert.issuer}</p>
                  )}

                  <ResumeDescription
                    description={cert.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.achievements?.length > 0 && (
          <section className="mt-1">
            <h2
              className="text-sm uppercase tracking-widest font-semibold"
              style={{ color: accentColor }}
            >
              ACHIEVEMENTS
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
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm text-gray-500"
                  />

                  <ResumeDescription
                    description={achievement.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };
  
  export default MinimalTemplate;
