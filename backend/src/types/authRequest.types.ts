import IUser from "./user.types";
import { Request } from "express";

export default interface IAuthRequest<
  P = {}, // params
  ResBody = any, // response
  ReqBody = any, // body
  ReqQuery = any // query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: IUser;
}
