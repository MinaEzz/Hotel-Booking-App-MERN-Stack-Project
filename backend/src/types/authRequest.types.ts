import IUser from "./user.types";
import { Request } from "express";

export default interface AuthRequest extends Request {
  user?: IUser;
}
