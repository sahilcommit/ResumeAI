import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data) {
      return toast.error("Write something first");
    }

    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary "${data}"`;

      const res = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: res.data.enhancedContent,
      }));

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Professional Summary
          </h3>
          <p className="text-sm text-slate-500">
            Write a short intro about yourself.
          </p>
        </div>

        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 text-sm font-medium text-violet-700 transition hover:bg-violet-100 disabled:opacity-60"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}

          {isGenerating ? "Enhancing..." : "Enhance with AI"}
        </button>
      </div>

      <div>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          placeholder="Write your professional summary..."
          className="min-h-36 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />

        <p className="mt-2 text-xs text-slate-500">
          Keep it short (3-4 lines) and highlight your key skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;