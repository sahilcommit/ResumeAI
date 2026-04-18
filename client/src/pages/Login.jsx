import { Eye, EyeOff, Lock, Mail, User2Icon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../config/api";
import { loginSuccess } from "../app/features/authSlice.js";
import toast from "react-hot-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialState = searchParams.get("state") || "login";

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent multiple clicks

    try {
      setLoading(true);

      const { data } = await api.post(`/api/users/${state}`, formData);

      dispatch(loginSuccess(data));
      localStorage.setItem("token", data.token);

      toast.success(data.message);

      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8"
      >
        <h1 className="mt-1 text-3xl font-semibold text-slate-900">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please {state} to continue
        </p>

        {state !== "login" && (
          <div className="mt-6 flex h-12 w-full items-center gap-2 rounded-xl border border-slate-300 px-4 text-slate-500 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
            <User2Icon size={16} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mt-4 flex h-12 w-full items-center gap-2 rounded-xl border border-slate-300 px-4 text-slate-500 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
          <Mail size={14} />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-sm text-slate-800 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 flex h-12 w-full items-center gap-2 rounded-xl border border-slate-300 px-4 text-slate-500 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
          <Lock size={14} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-sm text-slate-800 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 text-slate-500 transition hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 h-11 w-full rounded-xl bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : state === "login"
            ? "Login"
            : "Sign up"}
        </button>

        <p className="mb-1 mt-4 text-sm text-slate-500">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setState((prev) =>
                prev === "login" ? "register" : "login"
              )
            }
            className="cursor-pointer font-medium text-slate-900 hover:underline"
          >
            click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
