// import { connect } from "./utils/db.js";
import express from "express";
import config from "./config/config.js";
import { errorHandling } from "./middleware/errorHandling.js";
// import authRoutes from "./routes/authRouter.js";
// import userRoutes from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

import cors from "cors";

const allowedOrigins = [
  "https://fullstack-frontend-login.onrender.com",
  
];
const app = express();

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Nicht erlaubte Origin: " + origin));
      }
    },
    credentials: true,
  })
);
//app.options("*", cors());
app.use(express.json());
//app.use(cors());

app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// Beispiel-Route
app.get("/", (_req, res) => {
  res.json({ message: "Hello from backend" });
});

app.use(errorHandling);

// connect();
app.listen(config.PORT, () =>
  console.log(`Server is running on PORT http//localhost:${config.PORT}`)
);
//admin123!&/MN1231asc
