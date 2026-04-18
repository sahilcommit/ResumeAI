import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/resumeForms/ResumePreview";
import { ArrowLeft, LoaderCircleIcon } from "lucide-react";
import api from "../config/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId) return;

      setIsLoading(true);

      try {
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        setResumeData(data.resume);
      } catch {
        setResumeData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
          <LoaderCircleIcon className="size-5 animate-spin" />
          <span className="text-sm font-medium">Loading resume...</span>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <p className="text-center text-3xl font-semibold text-slate-700 sm:text-4xl">
          Resume not found
        </p>

        <a
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <ArrowLeft className="mr-2 size-4" />
          Go to home page
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="bg-white py-3 sm:py-4"
        />
      </div>
    </div>
  );
};

export default Preview;
