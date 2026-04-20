import "dotenv/config";
import connectDb from "./configs/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5001;

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

export { startServer };
