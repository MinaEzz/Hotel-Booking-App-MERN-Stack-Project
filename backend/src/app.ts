import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import STATUSTEXT from "./constants/httpStatusText";
import type IAppError from "./types/appError.types";
// ROUTES
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
import hotelsRouter from "./routes/hotels.routes";
import roomsRouter from "./routes/rooms.routes";
import countriesRouter from "./routes/countries.routes";
import searchRouter from "./routes/search.routes";
import createError from "./utils/createError";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ROUTES MIDDLEWARE
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/search", searchRouter);

// GLOBAL MIDDLEWARE FOR NOT FOUND ROUTERS
app.all(/.*/, (_req: Request, _res: Response, next: NextFunction) => {
  return next(
    createError("This Resource Is Not Available", 404, STATUSTEXT.ERROR)
  );
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

export default app;
