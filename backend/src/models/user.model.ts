import bcrypt from "bcrypt";
import mongoose from "mongoose";
import IUser from "../types/user.types";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: {
      codeHash: { type: String, default: null },
      expiresAt: { type: Date, default: null },
      attempts: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// setOtp method
userSchema.methods.setOtp = async function (plainOtp: number, ttlMinutes = 5) {
  const hash = await bcrypt.hash(String(plainOtp), 8);
  this.otp = {
    codeHash: hash,
    expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000),
    attempts: 0,
  };
  await this.save();
};

// verifyOtp method
userSchema.methods.verifyOtp = async function (plainOtp: string) {
  if (!this.otp || !this.otp.codeHash || !this.otp.expiresAt) return false;
  if (this.otp.expiresAt < new Date()) return false;
  const match = await bcrypt.compare(plainOtp, this.otp.codeHash);
  if (match) {
    this.otp = { codeHash: null, expiresAt: null, attempts: 0 };
    await this.save();
  }
  return match;
};

// incrementOtpAttempts method
userSchema.methods.incrementOtpAttempts = async function (by = 1) {
  this.otp.attempts += by;
  await this.save();
};

export default mongoose.model("User", userSchema);
