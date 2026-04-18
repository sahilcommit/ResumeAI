import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../config/api.js";
import toast from "react-hot-toast";
import * as pdfToTextModule from "react-pdftotext";

const pdfToText =
  pdfToTextModule?.default?.default ??
  pdfToTextModule?.default ??
  pdfToTextModule;
// react-pdftotext has slightly different export shapes depending on bundler/package version.
// This fallback chain keeps the upload feature stable without locking us to one export format.

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const firstName = user?.name?.trim()?.split(/\s+/)?.[0] || "there";

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const tileButtonClass =
    "w-full h-44 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:shadow-sm";
  const modalOverlayClass =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4";
  const modalCardClass =
    "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7";
  const inputClass =
    "mt-4 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200";
  const primaryButtonClass =
    "h-10 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60";

  const loadAllResumes = useCallback(async () => {
    if (!token) return;

    try {
      // Dashboard is just a list view; backend remains the source of truth.
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [token]);

  const createResume = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);

      // After creating, we immediately move into the builder.
      // That keeps the flow short: create -> edit.
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!resume) {
        toast.error("Please select a PDF resume first");
        return;
      }

      const resumeText = await pdfToText(resume);

      // Upload flow does not send the raw PDF to our backend parser directly.
      // First we extract text in the browser, then backend asks Gemini to structure it.
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);

      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    e.preventDefault();

    try {
      const isConfirmed = window.confirm("Update resume title?");
      if (!isConfirmed) return;

      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (!isConfirmed) return;

      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });

      setAllResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllResumes();
    }
  }, [token, loadAllResumes]);

  const closeCreateModal = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  const closeUploadModal = () => {
    setShowUploadResume(false);
    setTitle("");
    setResume(null);
  };

  const closeEditModal = () => {
    setEditResumeId("");
    setTitle("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500 sm:text-base">
          Hey {firstName},
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          My Resumes
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Create a new resume or continue editing an existing one.
        </p>
      </div>

      {/* Action tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className={tileButtonClass}
        >
          <PlusIcon className="size-9" />
          <p className="mt-3 text-sm font-medium">Create Resume</p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className={tileButtonClass}
        >
          <UploadCloudIcon className="size-9" />
          <p className="mt-3 text-sm font-medium">Upload Resume</p>
        </button>
      </div>

      {/* Resume tiles */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {allResumes.map((resume, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={resume._id}
              // The whole card is clickable because entering the builder is the primary action.
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border bg-white transition hover:shadow-sm"
              style={{ borderColor: color }}
            >
              <FilePenLineIcon style={{ color }} className="size-8" />
              <p
                style={{ color }}
                className="mt-3 w-full truncate px-3 text-center text-sm font-medium"
              >
                {resume.title}
              </p>

              {resume.isDemo && (
                <span className="mt-2 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600">
                  Demo
                </span>
              )}

              <div className="absolute right-2 top-2 flex gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
                >
                  <TrashIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  <PencilIcon className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={closeCreateModal}
          className={modalOverlayClass}
        >
          <div onClick={(e) => e.stopPropagation()} className={modalCardClass}>
            <h2 className="text-lg font-semibold text-slate-900">Create Resume</h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter a title to start building your resume.
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className={inputClass}
            />
            <div className="mt-4 flex justify-end">
              <button className={primaryButtonClass}>Create</button>
            </div>
          </div>
        </form>
      )}

      {/* Upload Modal */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={closeUploadModal}
          className={modalOverlayClass}
        >
          <div onClick={(e) => e.stopPropagation()} className={modalCardClass}>
            <h2 className="text-lg font-semibold text-slate-900">Upload Resume</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a title and upload your PDF resume.
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className={inputClass}
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="mt-3 w-full text-sm text-slate-600 file:mr-3 file:h-9 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:text-slate-700 hover:file:bg-slate-200"
            />

            <div className="mt-4 flex justify-end">
              <button
                disabled={isLoading}
                className={`${primaryButtonClass} min-w-24 flex items-center justify-center`}
              >
                {isLoading ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Edit Modal */}
      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={closeEditModal}
          className={modalOverlayClass}
        >
          <div onClick={(e) => e.stopPropagation()} className={modalCardClass}>
            <h2 className="text-lg font-semibold text-slate-900">Edit Title</h2>
            <p className="mt-1 text-sm text-slate-500">Update your resume title.</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputClass}
            />
            <div className="mt-4 flex justify-end">
              <button className={primaryButtonClass}>Update</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
