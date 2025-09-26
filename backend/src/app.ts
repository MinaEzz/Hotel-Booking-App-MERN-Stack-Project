import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const port: number = Number(process.env.PORT) || 8080;
import connectMongoDB from "./config/connectMongoDB";
import STATUSTEXT from "./constants/httpStatusText";
import cookieParser from "cookie-parser";
// ROUTES
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
import hotelsRouter from "./routes/hotels.routes";
import roomsRouter from "./routes/rooms.routes";
import IAppError from "./types/appError.types";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES MIDDLEWARE
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
// GLOBAL MIDDLEWARE FOR NOT FOUND ROUTERS
app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("This Resource Is Not Available");
  error.status = STATUSTEXT.ERROR;
  error.code = 404;
  return next(error);
});
// DEFAULT ERROR HANDLER
app.use(
  (error: IAppError, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.statusCode || 500).json({
      status: error.status || STATUSTEXT.ERROR,
      data: error.errors || null,
      message: error.message || "Unkown Error Occured.",
      code: error.statusCode || 500,
    });
  }
);

app.listen(port, () => {
  console.log("> Server is up and running on port : " + port);
  console.log("NODE_ENV =>", process.env.NODE_ENV);
  connectMongoDB();
});
