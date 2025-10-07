import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import ICountry from "../types/country.types";

export const getCountries = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(
      `${process.env.REST_COUNTRIES_BASE_URL!}/all?fields=name,cca2`
    );
    const data = (await response.json()) as ICountry[];

    const formatted = data
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );

    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        countries: formatted,
      },
      message: "Countries Fetched Successfully",
      results: formatted.length,
    });
  } catch (error: unknown) {
    console.log("GET COUNTRIES ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
