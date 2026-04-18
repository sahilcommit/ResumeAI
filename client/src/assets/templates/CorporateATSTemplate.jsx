import { getAllProfileLinks } from "../../utils/resumeLinks";
import { normalizeSkillGroups } from "../../utils/skills";
import { ATSResumeItem, ATSSection } from "./shared/ATSResumeBlocks";
import { formatResumeDate } from "./shared/ATSResumeHelpers";
import { formatEducationTitle } from "./shared/ResumeTemplateHelpers";

const CorporateATSTemplate = ({ data, accentColor }) => {
  const profileLinks = getAllProfileLinks(data.personal_info);
  const skillGroups = normalizeSkillGroups(data.skills);

  return (
    <div className="max-w-4xl mx-auto p-7 bg-white text-gray-800 leading-relaxed">

      {/* ================= HEADER ================= */}
      <header className="mb-3 flex flex-col items-center gap-4 text-center">

        {/* profile image (only show if user uploaded one) */}
        {data.personal_info?.image && (
          <img
            src={data.personal_info.image}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
            style={{ backgroundColor: accentColor }} // fallback bg color
          />
        )}

        <div>
          {/* name */}
          <h1 className="text-3xl font-semibold">
            {data.personal_info?.full_name || "Your Name"}
          </h1>

          {/* profession */}
          <p className="text-sm text-gray-600">
            {data.personal_info?.profession || ""}
          </p>

          {/* contact info row */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-600">

            {/* email */}
            {data.personal_info?.email && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${data.personal_info?.email}`}
              >
                <span>{data.personal_info.email}</span>
              </a>
            )}

            {/* phone */}
            {data.personal_info?.phone && (
              <span>{data.personal_info.phone}</span>
            )}

            {/* location */}
            {data.personal_info?.location && (
              <span>{data.personal_info.location}</span>
            )}
            {profileLinks.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                target="_blank"
                rel="noopener noreferrer"
                href={link.url}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ================= PROFESSIONAL SUMMARY ================= */}
      {data.professional_summary && (
        <ATSSection title="SUMMARY" accentColor={accentColor}>
          <p className="text-gray-700 text-sm">
            {data.professional_summary}
          </p>
        </ATSSection>
      )}

      {data.experience && data.experience.length > 0 && (
        <ATSSection title="EXPERIENCE" accentColor={accentColor}>
          {data.experience.map((exp, i) => (
            <ATSResumeItem
              key={i}
              title={[exp.position, exp.company ? `at ${exp.company}` : ""]
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
          ))}
        </ATSSection>
      )}

      {data.project && data.project.length > 0 && (
        <ATSSection title="PROJECTS" accentColor={accentColor}>
          {data.project.map((project, i) => (
            <ATSResumeItem
              key={i}
              title={project.name}
              date={project.date ? formatResumeDate(project.date) : ""}
              description={project.description}
              url={project.link}
              linkLabel={project.linkLabel}
              linkFallback="Live Demo"
            />
          ))}
        </ATSSection>
      )}

      {data.education && data.education.length > 0 && (
        <ATSSection title="EDUCATION" accentColor={accentColor}>
          {data.education.map((edu, i) => (
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

      {skillGroups.length > 0 && (
        <ATSSection title="SKILLS" accentColor={accentColor}>
          <div className="space-y-1 text-sm text-gray-700">
            {skillGroups.map((group, idx) => (
              <p key={idx}>
                <span className="font-semibold">{group.category}:</span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </ATSSection>
      )}

      {data.certification && data.certification.length > 0 && (
        <ATSSection title="CERTIFICATIONS" accentColor={accentColor}>
          {data.certification.map((cert, index) => (
            <ATSResumeItem
              key={index}
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

      {data.achievements && data.achievements.length > 0 && (
        <ATSSection title="ACHIEVEMENTS" accentColor={accentColor}>
          {data.achievements.map((achievement, index) => (
            <ATSResumeItem
              key={index}
              title={achievement.title}
              date={formatResumeDate(achievement.date)}
              description={achievement.description}
              url={achievement.link}
              linkLabel={achievement.linkLabel}
            />
          ))}
        </ATSSection>
      )}
    </div>
  );
};

export default CorporateATSTemplate;
