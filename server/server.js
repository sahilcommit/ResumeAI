import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;
const configuredOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const parseOrigin = (value = "") => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

const isConfiguredVercelOrigin = configuredOrigins.some((origin) => {
  const parsedOrigin = parseOrigin(origin);
  return parsedOrigin?.hostname.endsWith(".vercel.app");
});

const isAllowedOrigin = (origin = "") => {
  if (!origin) return true;
  if (configuredOrigins.includes(origin)) return true;

  // Keep local development simple even if Vite port changes.
  if (/^http:\/\/localhost:\d+$/.test(origin)) return true;

  // Vercel preview URLs can change between deployments, so allow them
  // when at least one Vercel origin is intentionally configured.
  const parsedOrigin = parseOrigin(origin);
  if (isConfiguredVercelOrigin && parsedOrigin?.hostname.endsWith(".vercel.app")) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json({ limit: "10mb" }));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
