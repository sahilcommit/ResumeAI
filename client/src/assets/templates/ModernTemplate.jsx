import {
    Mail,
    Phone,
    MapPin,
    Link,
    Globe,
    AtSign,
    ExternalLink,
  } from "lucide-react";
import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
  ResumeDescription,
  ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";
  
  const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [year, month] = dateStr.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
  
    // ✅ reusable helpers
    const formatUrl = (url) => {
      if (!url) return "";
      return url.startsWith("http") ? url : `https://${url}`;
    };
  
    const cleanUrl = (url) => url.replace(/^https?:\/\//, "");
    const customLinks = getCustomLinks(data.personal_info);
    const skillGroups = normalizeSkillGroups(data.skills);
  
    return (
      <div className="max-w-4xl mx-auto bg-white text-gray-800">
        {/* HEADER */}
        <header
          className="px-7 py-4 text-white"
          style={{ backgroundColor: accentColor }}
        >
          <h1 className="text-4xl font-light">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
  
          <p className="uppercase text-sm tracking-widest">
            {data.personal_info?.profession || ""}
          </p>
  
          <div className="grid sm:grid-cols-2 gap-2 text-sm mt-2">
            {data.personal_info?.email && (
              <a
                href={`mailto:${data.personal_info.email}`}
                className="flex items-center gap-2"
              >
                <Mail className="size-4" />
                {data.personal_info.email}
              </a>
            )}
  
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                {data.personal_info.phone}
              </div>
            )}
  
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {data.personal_info.location}
              </div>
            )}
  
            {data.personal_info?.linkedin && (
              <a
                href={formatUrl(data.personal_info.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Link className="size-4" />
                {cleanUrl(data.personal_info.linkedin)}
              </a>
            )}
  
            {data.personal_info?.github && (
              <a
                href={formatUrl(data.personal_info.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <AtSign className="size-4" />
                {cleanUrl(data.personal_info.github)}
              </a>
            )}
  
            {data.personal_info?.website && (
              <a
                href={formatUrl(data.personal_info.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Globe className="size-4" />
                {cleanUrl(data.personal_info.website)}
              </a>
            )}

            {customLinks.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                href={normalizeUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Globe className="size-4" />
                {link.label}
              </a>
            ))}
          </div>
        </header>
  
        <div className="px-7 py-4">
          {/* SUMMARY */}
          {data.professional_summary && (
            <section className="mb-3">
              <h2 className="text-xl font-light border-b">Professional Summary</h2>
              <p className="text-sm">{data.professional_summary}</p>
            </section>
          )}
  
          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xl font-light border-b">Experience</h2>
  
              {data.experience.map((exp, i) => (
                <div key={i} className="pl-4 border-l mt-2">
                  <ResumeItemHeader
                    title={exp.position}
                    date={`${formatDate(exp.start_date)} - ${
                      exp.is_current ? "Present" : formatDate(exp.end_date)
                    }`}
                    titleClassName="font-medium"
                    dateClassName="whitespace-nowrap rounded bg-gray-100 px-2 text-xs text-gray-600"
                    linkClassName="text-sm"
                  />
                  {exp.company && (
                    <p style={{ color: accentColor }}>{exp.company}</p>
                  )}

                  <ResumeDescription
                    description={exp.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </section>
          )}
  
          {/* PROJECTS */}
          {data.project?.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xl font-light border-b">Projects</h2>
  
              {data.project.map((p, i) => (
                <div key={i} className="pl-4 border-l mt-2">
                  <ResumeItemHeader
                    title={p.name}
                    date={formatDate(p.date)}
                    url={p.link}
                    linkLabel={p.linkLabel}
                    linkFallback="Live Demo"
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm"
                  />

                  <ResumeDescription
                    description={p.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </section>
          )}
  
          <div className="grid sm:grid-cols-2 gap-4">
            {/* EDUCATION */}
            {data.education?.length > 0 && (
              <section>
                <h2 className="text-xl font-light border-b">Education</h2>
  
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3>
                      {formatEducationTitle(edu.degree, edu.field)}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
  
                    <div className="flex justify-between text-sm">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </section>
            )}
  
            {/* SKILLS */}
            {skillGroups.length > 0 && (
              <section>
                <h2 className="text-xl font-light border-b">Skills</h2>
  
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillGroups.flatMap((group) => group.items).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-white rounded-full text-sm"
                      style={{ backgroundColor: accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
  
          {/* CERTIFICATIONS */}
          {data.certification?.length > 0 && (
            <section className="mt-3">
              <h2 className="text-xl font-light border-b">Certifications</h2>
  
              {data.certification.map((cert, i) => (
                <div key={i} className="mt-2">
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

                  {cert.issuer && <p className="text-sm italic">{cert.issuer}</p>}

                  <ResumeDescription
                    description={cert.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </section>
          )}

          {data.achievements?.length > 0 && (
            <section className="mt-3">
              <h2 className="text-xl font-light border-b">Achievements</h2>

              {data.achievements.map((achievement, i) => (
                <div key={i} className="pl-4 border-l mt-2">
                  <ResumeItemHeader
                    title={achievement.title}
                    date={formatDate(achievement.date)}
                    url={achievement.link}
                    linkLabel={achievement.linkLabel}
                    titleClassName="font-medium"
                    dateClassName="text-sm text-gray-500 whitespace-nowrap"
                    linkClassName="text-sm"
                  />

                  <ResumeDescription
                    description={achievement.description}
                    className="text-sm text-gray-700"
                    listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  };
  
  export default ModernTemplate;
