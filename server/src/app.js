import express from "express";
import programmationRoutes from "./routes/programmation.routes";
import userRoutes from "./routes/user.routes"
import programsRoutes from "./routes/programs.routes"
import morgan from "morgan";
import cors from "cors";
import { SECRET } from "./settings/llaves";

const app = express();

// settings
app.set("port", process.env.PORT || 9000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
   cors({
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      credentials: true,
   })
);
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", true);
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
   next();
});
app.set("key", SECRET);

//routes
app.use("/users", userRoutes);
app.use("/programmations", programmationRoutes);
app.use("/programs", programsRoutes);

export default app;
