import { getAllProfileLinks } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import { ATSResumeItem, ATSSection } from "./shared/ATSResumeBlocks";
import { formatResumeDate } from "./shared/ATSResumeHelpers";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const MinimalATSTemplate = ({ data, accentColor }) => {
  const personalInfo = data.personal_info || {};
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const projects = Array.isArray(data.project) ? data.project : [];
  const skills = normalizeSkillGroups(data.skills);
  const certifications = Array.isArray(data.certification)
    ? data.certification
    : [];
  const achievements = Array.isArray(data.achievements) ? data.achievements : [];
  const profileLinks = getAllProfileLinks(personalInfo);

  const contactItems = [
    personalInfo.email && {
      label: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    personalInfo.phone && {
      label: personalInfo.phone,
    },
    personalInfo.location && {
      label: personalInfo.location,
    },
    ...profileLinks.map((link) => ({
      label: link.label,
      href: link.url,
    })),
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 text-sm leading-relaxed text-black">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold">
          {personalInfo.full_name || "Your Name"}
        </h1>

        {(personalInfo.profession ||
          personalInfo.email ||
          personalInfo.phone ||
          personalInfo.location ||
          profileLinks.length > 0) && (
          <div className="mt-1 space-y-1 text-xs text-slate-700">
            {personalInfo.profession && (
              <p className="font-medium uppercase tracking-[0.12em]">
                {personalInfo.profession}
              </p>
            )}

            <div className="flex flex-wrap justify-center text-xs break-words text-slate-700">
              {contactItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="inline-flex items-center">
                  {index > 0 && <span className="px-2 text-slate-400">|</span>}
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {data.professional_summary && (
        <ATSSection title="SUMMARY" accentColor={accentColor}>
          <p>{data.professional_summary}</p>
        </ATSSection>
      )}

      {education.length > 0 && (
        <ATSSection title="EDUCATION" accentColor={accentColor}>
          {education.map((edu, i) => (
            <ATSResumeItem
              key={i}
              title={edu.institution}
              date={formatResumeDate(edu.graduation_date)}
              subtitle={[
                formatEducationTitle(edu.degree, edu.field),
                edu.gpa ? `GPA: ${edu.gpa}` : "",
              ]
                .filter(Boolean)
                .join(" | ")}
            />
          ))}
        </ATSSection>
      )}

      {experience.length > 0 && (
        <ATSSection title="EXPERIENCE" accentColor={accentColor}>
          {experience.map((exp, i) => {
            return (
              <ATSResumeItem
                key={i}
                title={[
                  exp.position,
                  exp.company ? `at ${exp.company}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                date={[
                  formatResumeDate(exp.start_date),
                  exp.is_current ? "Present" : formatResumeDate(exp.end_date),
                ]
                  .filter(Boolean)
                  .join(" - ")}
                description={exp.description}
              />
            );
          })}
        </ATSSection>
      )}

      {skills.length > 0 && (
        <ATSSection title="SKILLS" accentColor={accentColor}>
          <div className="space-y-1">
            {skills.map((group, index) => (
              <p key={index}>
                <span className="font-semibold">{group.category}:</span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </ATSSection>
      )}

      {projects.length > 0 && (
        <ATSSection title="PROJECTS" accentColor={accentColor}>
          {projects.map((proj, i) => (
            <ATSResumeItem
              key={i}
              title={proj.name}
              date={proj.date ? formatResumeDate(proj.date) : ""}
              description={proj.description}
              url={proj.link}
              linkLabel={proj.linkLabel}
              linkFallback="Live Demo"
            />
          ))}
        </ATSSection>
      )}

      {achievements.length > 0 && (
        <ATSSection title="ACHIEVEMENTS" accentColor={accentColor}>
          {achievements.map((achievement, i) => (
            <ATSResumeItem
              key={i}
              title={achievement.title}
              date={formatResumeDate(achievement.date)}
              description={achievement.description}
              url={achievement.link}
              linkLabel={achievement.linkLabel}
            />
          ))}
        </ATSSection>
      )}

      {certifications.length > 0 && (
        <ATSSection title="CERTIFICATIONS" accentColor={accentColor}>
          {certifications.map((cert, i) => (
            <ATSResumeItem
              key={i}
              title={cert.certificate_name}
              date={formatResumeDate(cert.issue_date)}
              subtitle={cert.issuer}
              description={cert.description}
              url={cert.credential_url}
              linkLabel={cert.linkLabel}
              linkFallback="View Certificate"
            />
          ))}
        </ATSSection>
      )}
    </div>
  );
};

export default MinimalATSTemplate;
