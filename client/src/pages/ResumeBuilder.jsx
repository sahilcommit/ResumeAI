import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  Share2Icon,
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import PersonalInfoForm from "../components/resumeForms/PersonalInfoForm";
import ResumePreview from "../components/resumeForms/ResumePreview";
import TemplateSelector from "../components/resumeForms/TemplateSector";
import ColorPicker from "../components/resumeForms/ColorPicker";
import FontPicker from "../components/resumeForms/FontPicker";
import ProfessionalSummaryForm from "../components/resumeForms/ProfessionalSummaryForm";
import ExperienceForm from "../components/resumeForms/ExperienceForm";
import EducationForm from "../components/resumeForms/EducationForm";
import ProjectForm from "../components/resumeForms/ProjectForm";
import SkillsForm from "../components/resumeForms/SkillsForm";
import CertificationForm from "../components/resumeForms/CertificationForm";
import AchievementsForm from "../components/resumeForms/AchievementsForm";
import api from "../config/api";
import { normalizeSkillGroups } from "../utils/skills";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  // This state mirrors the full resume document from MongoDB.
  // Builder forms update pieces of it, and saveResume sends the latest version back.
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: { custom_links: [] },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    certification: [],
    achievements: [],
    template: "minimalATSTemplate",
    accent_color: "#6b7280",
    font_family: '"Times New Roman", Times, serif',
    public: false,
  });
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "personal", name: "Personal" },
    { id: "summary", name: "Summary" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "certification", name: "Certification" },
    { id: "achievements", name: "Achievements" },
  ];

  const activeSection = sections[activeSectionIndex];
  const imageTemplates = new Set([
    "minimal-image",
    "corporateATSTemplate",
    "modernProTemplate",
  ]);
  const supportsImageUpload = imageTemplates.has(resumeData.template);
  const actionButtonClass =
    "h-10 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50";
  const navButtonClass =
    "h-10 inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed";

  useEffect(() => {
    const loadExistingResume = async () => {
      if (!token || !resumeId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
          headers: { Authorization: token },
        });

        if (data.resume) {
          // We normalize a few nested fields here so form components can assume a stable shape.
          setResumeData({
            ...data.resume,
            personal_info: {
              custom_links: [],
              ...(data.resume.personal_info || {}),
            },
            skills: normalizeSkillGroups(data.resume.skills || []),
            certification: data.resume.certification || [],
            achievements: data.resume.achievements || [],
          });
          document.title = data.resume.title;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingResume();
  }, [resumeId, token]);

  if (isLoading) return <p className="p-6">Loading...</p>;

  const toggleVisibility = async () => {
    try {
      // Public/private is just one field, but we still use the same update endpoint
      // so the backend keeps all resume writes in one place.
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData((prev) => ({ ...prev, public: !prev.public }));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({ url });
      return;
    }

    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      setIsSaving(true);

      // Clone before changing data so local form state stays predictable.
      const updatedResumeData = structuredClone(resumeData);
      updatedResumeData.skills = normalizeSkillGroups(
        updatedResumeData.skills || []
      );

      // If image is still a File object, backend will receive it separately in FormData.
      // The JSON payload itself should only contain serializable fields.
      if (typeof resumeData.personal_info?.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));

      if (removeBackground) {
        formData.append("removeBackground", "yes");
      }

      if (typeof resumeData.personal_info?.image === "object") {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      // Backend can change data shape a little after save (especially image URL),
      // so we replace local state with the saved document from server.
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* back */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 pt-5 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* LEFT PANEL */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {/* controls */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* These three controls affect presentation only, not resume content. */}
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(t) => setResumeData((p) => ({ ...p, template: t }))}
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(c) =>
                  setResumeData((p) => ({ ...p, accent_color: c }))
                }
              />

              <FontPicker
                selectedFont={resumeData.font_family}
                onChange={(font) =>
                  setResumeData((p) => ({ ...p, font_family: font }))
                }
              />
            </div>
          </div>

          <div className="mb-6 rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Section {activeSectionIndex + 1} of {sections.length}:{" "}
              {activeSection.name}
            </p>
          </div>

          {/* forms */}
          {/* Only one section form is shown at a time.
              This keeps the builder easier to follow than showing every form at once. */}
          {activeSection.id === "personal" && (
            <PersonalInfoForm
              data={resumeData.personal_info}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, personal_info: data }))
              }
              removeBackground={removeBackground}
              setRemoveBackground={setRemoveBackground}
              showImageUpload={supportsImageUpload}
            />
          )}

          {activeSection.id === "summary" && (
            <ProfessionalSummaryForm
              data={resumeData.professional_summary}
              onChange={(data) =>
                setResumeData((p) => ({
                  ...p,
                  professional_summary: data,
                }))
              }
              setResumeData={setResumeData}
            />
          )}

          {activeSection.id === "experience" && (
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, experience: data }))
              }
            />
          )}

          {activeSection.id === "education" && (
            <EducationForm
              data={resumeData.education}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, education: data }))
              }
            />
          )}

          {activeSection.id === "projects" && (
            <ProjectForm
              data={resumeData.project}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, project: data }))
              }
            />
          )}

          {activeSection.id === "skills" && (
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, skills: data }))
              }
            />
          )}

          {activeSection.id === "certification" && (
            <CertificationForm
              data={resumeData.certification || []}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, certification: data }))
              }
            />
          )}

          {activeSection.id === "achievements" && (
            <AchievementsForm
              data={resumeData.achievements || []}
              onChange={(data) =>
                setResumeData((p) => ({ ...p, achievements: data }))
              }
            />
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveSectionIndex((i) => Math.max(i - 1, 0))}
              disabled={activeSectionIndex === 0}
              className={navButtonClass}
            >
              <ChevronLeft className="size-4" /> Prev
            </button>

            <button
              onClick={saveResume}
              disabled={isSaving}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() =>
                setActiveSectionIndex((i) =>
                  Math.min(i + 1, sections.length - 1)
                )
              }
              disabled={activeSectionIndex === sections.length - 1}
              className={navButtonClass}
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-7">
          {/* actions */}
          <div className="mb-4 flex flex-wrap items-center justify-start gap-2 sm:justify-end">
            {resumeData.public && (
              <button onClick={handleShare} className={actionButtonClass}>
                <Share2Icon className="size-4" /> Share
              </button>
            )}

            <button onClick={toggleVisibility} className={actionButtonClass}>
              {resumeData.public ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
              {resumeData.public ? "Public" : "Private"}
            </button>

            <button onClick={downloadResume} className={actionButtonClass}>
              <DownloadIcon className="size-4" /> Download
            </button>
          </div>

          {/* preview */}
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            fontFamily={resumeData.font_family}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
