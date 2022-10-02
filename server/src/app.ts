import * as express from "express";
import programmationRoutes from "./routes/programmation.routes";
import userRoutes from "./routes/user.routes";
import programsRoutes from "./routes/programs.routes";
import * as morgan from "morgan";
import * as cors from "cors";
const SECRET = "./settings/llaves";
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
   origin: allowedOrigins,
};

const app = express();

// settings
app.set("port", process.env.PORT || 9000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(options));
// app.use(function (req: Request, res: any, next: express.NextFunction) {
//    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//    res.header("Access-Control-Allow-Headers", true);
//    res.header("Access-Control-Allow-Credentials", true);
//    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//    next();
// });
app.set("key", SECRET);

//routes
app.use("/users", userRoutes);
app.use("/programmations", programmationRoutes);
app.use("/programs", programsRoutes);

export default app;
