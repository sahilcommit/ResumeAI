import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast, resolveValue } from "react-hot-toast";
import { X } from "lucide-react";

// Pages
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import ResumeBuilder from "./pages/ResumeBuilder";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

// Layout
import Layout from "./pages/Layout";
import api from "./config/api";
import { loginSuccess, setLoading } from "./app/features/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      // We keep the token in localStorage so refresh does not log the user out.
      // On app boot, we use that token once to rebuild Redux auth state.
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      try {
        // This call is the "trust but verify" step:
        // token exists locally, but backend confirms it is still valid.
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(loginSuccess({ token, user: data.user }));
          return;
        }
      } catch (error) {
        // If token is stale/invalid, clear it so the app falls back to login cleanly.
        localStorage.removeItem("token");
        console.error(error?.response?.data?.message || error.message);
      }

      dispatch(setLoading(false));
    };

    getUserData();
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            maxWidth: "420px",
            padding: 0,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {(t) => (
          <div
            className={`pointer-events-auto flex w-full items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${
              t.type === "error"
                ? "border-red-200 bg-white text-red-700"
                : "border-emerald-200 bg-white text-emerald-700"
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">
                {t.type === "error" ? "Something went wrong" : "Success"}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {resolveValue(t.message, t)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notification"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
      </Toaster>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Everything under /app is protected inside Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* Public shareable resume preview */}
        <Route path="/view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
