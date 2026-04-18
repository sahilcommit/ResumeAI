import {
  Mail,
  Phone,
  MapPin,
  Link,
  Globe,
  AtSign,
  Award,
  ExternalLink,
} from "lucide-react";
import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import {
  ResumeDescription,
  ResumeItemHeader,
} from "./shared/ResumeSectionBlocks";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const {
    personal_info = {},
    education = [],
    skills = [],
    experience = [],
    project = [],
    certification = [],
    achievements = [],
    professional_summary,
  } = data;
  const image = personal_info.image;
  const imageUrl =
    typeof image === "string"
      ? image
      : image && typeof image === "object"
      ? URL.createObjectURL(image)
      : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const formatLink = (url) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "");
  };

  const customLinks = getCustomLinks(personal_info);
  const skillGroups = normalizeSkillGroups(skills);

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
        <div className="grid grid-cols-3">
          {/* Image */}
          <div className="col-span-1 py-7">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                style={{ background: accentColor + "70" }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 mx-auto">
                <span className="text-xl font-bold">
                  {personal_info?.full_name?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>
  
          {/* Name + Title */}
          <div className="col-span-2 flex flex-col justify-center py-7 px-4">
            <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
              {personal_info.full_name || "Your Name"}
            </h1>
            <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
              {personal_info.profession || ""}
            </p>
          </div>
  
          {/* Sidebar */}
          <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
            {/* Contact */}
            <section className="mb-4">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                CONTACT
              </h2>
  
              <div className="space-y-2 text-sm">
                {personal_info.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color: accentColor }} />
                    <span>{personal_info.phone}</span>
                  </div>
                )}
  
                {personal_info.email && (
                  <a
                    href={`mailto:${personal_info.email}`}
                    className="flex items-center gap-2 break-all"
                  >
                    <Mail size={15} style={{ color: accentColor }} />
                    <span>{personal_info.email}</span>
                  </a>
                )}
  
                {personal_info.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: accentColor }} />
                    <span>{personal_info.location}</span>
                  </div>
                )}
  
                {personal_info.linkedin && (
                  <a
                    href={ensureHttps(personal_info.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Link size={16} style={{ color: accentColor }} />
                    <span className="break-all">
                      {formatLink(personal_info.linkedin)}
                    </span>
                  </a>
                )}
  
                {personal_info.github && (
                  <a
                    href={ensureHttps(personal_info.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <AtSign size={14} style={{ color: accentColor }} />
                    <span className="break-all">
                      {formatLink(personal_info.github)}
                    </span>
                  </a>
                )}
  
                {personal_info.website && (
                  <a
                    href={ensureHttps(personal_info.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Globe size={14} style={{ color: accentColor }} />
                    <span className="break-all">
                      {formatLink(personal_info.website)}
                    </span>
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
                    <Globe size={14} style={{ color: accentColor }} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </section>
  
            {/* Education */}
            {education.length > 0 && (
              <section className="mb-2">
                <h2 className="text-sm font-semibold tracking-widest text-zinc-600">
                  EDUCATION
                </h2>
  
                <div className="space-y-2 text-sm">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <p className="font-semibold">
                        {formatEducationTitle(edu.degree, edu.field)}
                      </p>
                      <p className="text-zinc-600">{edu.institution}</p>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatDate(edu.graduation_date)}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
  
            {/* Skills */}
            {skillGroups.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-2">
                  SKILLS
                </h2>
  
                <ul className="list-disc list-inside text-sm flex flex-wrap gap-2">
                  {skillGroups.flatMap((group) => group.items).map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
  
          {/* Main */}
          <main className="col-span-2 p-6 pt-0">
            {/* Summary */}
            {professional_summary && (
              <section className="mb-2">
                <h2
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: accentColor }}
                >
                  SUMMARY
                </h2>
                <p className="text-zinc-700 text-sm leading-relaxed">
                  {professional_summary}
                </p>
              </section>
            )}
  
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: accentColor }}
                >
                  EXPERIENCE
                </h2>
  
                <div className="space-y-2 mb-1">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <ResumeItemHeader
                        title={exp.position}
                        date={`${formatDate(exp.start_date)} - ${
                          exp.is_current ? "Present" : formatDate(exp.end_date)
                        }`}
                        titleClassName="text-sm font-semibold"
                        dateClassName="text-xs text-gray-500 whitespace-nowrap"
                        linkClassName="text-sm"
                      />
  
                      <p className="text-sm" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
  
                      <ResumeDescription
                        description={exp.description}
                        asBullets
                        listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
  
            {/* Projects */}
            {project.length > 0 && (
              <section className="mb-1">
                <h2
                  className="text-sm uppercase font-semibold"
                  style={{ color: accentColor }}
                >
                  PROJECTS
                </h2>
  
                <div className="space-y-1">
                  {project.map((p, index) => (
                    <div key={index}>
                      <ResumeItemHeader
                        title={p.name}
                        date={formatDate(p.date)}
                        url={p.link}
                        linkLabel={p.linkLabel}
                        linkFallback="Live Demo"
                        titleClassName="text-sm font-semibold"
                        dateClassName="text-xs text-gray-500 whitespace-nowrap"
                        linkClassName="text-sm"
                      />
  
                      {p.type && (
                        <p className="text-sm" style={{ color: accentColor }}>
                          {p.type}
                        </p>
                      )}
  
                      <ResumeDescription
                        description={p.description}
                        asBullets
                        listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
  
            {/* Certifications */}
            {certification.length > 0 && (
              <section>
                <h2
                  className="text-sm uppercase font-semibold"
                  style={{ color: accentColor }}
                >
                  CERTIFICATIONS
                </h2>
  
                <div className="space-y-1">
                  {certification.map((cert, index) => (
                    <div key={index} className="flex gap-2">
                      <Award size={16} style={{ color: accentColor }} />
  
                      <div className="flex-1">
                        <ResumeItemHeader
                          title={cert.certificate_name}
                          date={formatDate(cert.issue_date)}
                          url={ensureHttps(cert.credential_url)}
                          linkLabel={cert.linkLabel}
                          linkFallback="View Certificate"
                          titleClassName="font-medium"
                          dateClassName="text-sm text-gray-500 whitespace-nowrap"
                          linkClassName="text-sm"
                        />

                        {cert.issuer && (
                          <p className="text-sm italic">{cert.issuer}</p>
                        )}

                        <ResumeDescription
                          description={cert.description}
                          className="text-sm text-gray-700"
                          listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {achievements.length > 0 && (
              <section className="mt-1">
                <h2
                  className="text-sm uppercase font-semibold"
                  style={{ color: accentColor }}
                >
                  ACHIEVEMENTS
                </h2>

                <div className="space-y-1">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2">
                      <Award size={16} style={{ color: accentColor }} />

                      <div className="flex-1">
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
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    );
  };
  
  export default MinimalImageTemplate;
