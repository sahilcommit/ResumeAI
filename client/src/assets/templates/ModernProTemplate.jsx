import {
    Award,
    ExternalLink,
    AtSign,
    Globe,
    Link,
    Mail,
    MapPin,
    Phone,
  } from "lucide-react";
import { getCustomLinks, normalizeUrl } from "../../utils/resumeLinks";
import { flattenSkillItems } from "../../utils/skills";
import { ResumeDescription, ResumeItemHeader } from "./shared/ResumeSectionBlocks";
  
  const ModernProTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const [year, month] = dateStr.split("-");
      return new Date(year, month - 1).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    };
  
    // ✅ Safe URL formatter
    const formatUrl = (url) => {
      if (!url) return "";
      return url.startsWith("http") ? url : `https://${url}`;
    };
  
    const cleanUrlText = (url) => {
      return url.replace(/^https?:\/\//, "");
    };
    const customLinks = getCustomLinks(data.personal_info);
  
    // ✅ Image handler (supports file + string)
    const getImageSrc = (img) => {
      if (!img) return null;
      if (typeof img === "string") return img;
      if (typeof img === "object") return URL.createObjectURL(img);
      return null;
    };
  
    // ✅ Skill categorization (optimized)
    const categorizeSkills = (skills = []) => {
      const categories = {
        frontend: ["react", "javascript", "html", "css", "typescript", "angular", "vue"],
        backend: ["node", "express", "nest", "sql", "mongo", "mysql", "postgresql", "mongodb", "graphql"],
        devops: ["aws", "azure", "docker", "kubernetes", "git", "github", "ci/cd"],
      };
  
      const result = {
        frontend: [],
        backend: [],
        devops: [],
        other: [],
      };
  
      skills.forEach((skill) => {
        const lower = skill.toLowerCase();
  
        if (categories.frontend.some((k) => lower.includes(k))) {
          result.frontend.push(skill);
        } else if (categories.backend.some((k) => lower.includes(k))) {
          result.backend.push(skill);
        } else if (categories.devops.some((k) => lower.includes(k))) {
          result.devops.push(skill);
        } else {
          result.other.push(skill);
        }
      });
  
      return result;
    };
  
    const skills = categorizeSkills(flattenSkillItems(data.skills));
  
    return (
      <div className="max-w-5xl mx-auto bg-white text-zinc-800 py-3">
        {/* HEADER */}
        <header className="flex border-b border-gray-300">
          <div className="w-1/4 px-6 py-2">
            <div className="w-28 h-28 rounded-md overflow-hidden shadow">
              {getImageSrc(data.personal_info?.image) ? (
                <img
                  src={getImageSrc(data.personal_info.image)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                  No Image
                </div>
              )}
            </div>
          </div>
  
          <div className="w-3/4 py-4 pr-6">
            <h1 className="text-4xl font-bold">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="text-lg text-gray-600">
              {data.personal_info?.profession}
            </p>
  
            <div className="flex flex-wrap gap-3 text-sm mt-2">
              {data.personal_info?.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} style={{ color: accentColor }} />
                  {data.personal_info.location}
                </div>
              )}
  
              {data.personal_info?.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={14} style={{ color: accentColor }} />
                  {data.personal_info.phone}
                </div>
              )}
  
              {data.personal_info?.email && (
                <a
                  href={`mailto:${data.personal_info.email}`}
                  className="flex items-center gap-1"
                >
                  <Mail size={14} style={{ color: accentColor }} />
                  {data.personal_info.email}
                </a>
              )}
  
              {data.personal_info?.linkedin && (
                <a
                  href={formatUrl(data.personal_info.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Link size={14} style={{ color: accentColor }} />
                  {cleanUrlText(data.personal_info.linkedin)}
                </a>
              )}
  
              {data.personal_info?.github && (
                <a
                  href={formatUrl(data.personal_info.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <AtSign size={14} style={{ color: accentColor }} />
                  {cleanUrlText(data.personal_info.github)}
                </a>
              )}
  
              {data.personal_info?.website && (
                <a
                  href={formatUrl(data.personal_info.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Globe size={14} style={{ color: accentColor }} />
                  {cleanUrlText(data.personal_info.website)}
                </a>
              )}

              {customLinks.map((link, index) => (
                <a
                  key={`${link.label}-${index}`}
                  href={normalizeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Globe size={14} style={{ color: accentColor }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </header>
  
        {/* BODY */}
        <div className="grid grid-cols-3 divide-x">
          {/* LEFT */}
          <main className="col-span-2 p-6 space-y-4">
            {data.professional_summary && (
              <section>
                <h2 style={{ borderColor: accentColor }} className="border-b-2 font-bold">
                  PROFILE
                </h2>
                <p>{data.professional_summary}</p>
              </section>
            )}
  
            {data.experience?.length > 0 && (
              <section>
                <h2 style={{ borderColor: accentColor }} className="border-b-2 font-bold">
                  EXPERIENCE
                </h2>
  
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <ResumeItemHeader
                      title={[exp.company, exp.position].filter(Boolean).join(" - ")}
                      date={`${formatDate(exp.start_date)} - ${
                        exp.is_current ? "Present" : formatDate(exp.end_date)
                      }`}
                      titleClassName="font-semibold"
                      dateClassName="text-sm text-gray-600 whitespace-nowrap"
                      linkClassName="text-sm"
                    />

                    <ResumeDescription
                      description={exp.description}
                      asBullets
                      listClassName="mt-1 ml-5 list-disc space-y-1 text-sm text-gray-700"
                    />
                  </div>
                ))}
              </section>
            )}
          </main>
  
          {/* RIGHT */}
          <aside className="col-span-1 p-6 space-y-4">
            {/* SKILLS */}
            {flattenSkillItems(data.skills).length > 0 && (
              <section>
                <h2 className="font-bold border-b-2" style={{ borderColor: accentColor }}>
                  SKILLS
                </h2>
  
                {skills.frontend.length > 0 && (
                  <p><b>Frontend:</b> {skills.frontend.join(", ")}</p>
                )}
  
                {skills.backend.length > 0 && (
                  <p><b>Backend:</b> {skills.backend.join(", ")}</p>
                )}
  
                {skills.devops.length > 0 && (
                  <p><b>DevOps:</b> {skills.devops.join(", ")}</p>
                )}
  
                {skills.other.length > 0 && (
                  <p><b>Other:</b> {skills.other.join(", ")}</p>
                )}
              </section>
            )}

            {data.achievements?.length > 0 && (
              <section>
                <h2 className="font-bold border-b-2" style={{ borderColor: accentColor }}>
                  ACHIEVEMENTS
                </h2>

                {data.achievements.map((achievement, i) => (
                  <div key={i} className="mt-2">
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
                      className="text-sm text-gray-700"
                      listClassName="mt-1 ml-4 list-disc space-y-1 text-sm text-gray-700"
                    />
                  </div>
                ))}
              </section>
            )}
          </aside>
        </div>
      </div>
    );
  };
  
  export default ModernProTemplate;
