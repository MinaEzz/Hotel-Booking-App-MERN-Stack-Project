import { Document, Types } from "mongoose";

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  setOtp(plainOtp: number, ttlMinutes?: number): Promise<void>;
  verifyOtp(plainOtp: string): Promise<boolean>;
  incrementOtpAttempts(count?: number): Promise<void>;
}

export default interface IUser extends Document, IUserMethods {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;

  otp: {
    codeHash: string | null;
    expiresAt: Date | null;
    attempts: number;
  };
}
