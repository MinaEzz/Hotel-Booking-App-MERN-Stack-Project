import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import { IRestCountry } from "../types/country.types";
import Country from "../models/country.model";

export const getCountries = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await Country.find();
    if (countries.length === 0) {
      return res.status(200).json({
        status: STATUSTEXT.SUCCESS,
        data: { countries: [] },
        message: "No Countries In The Database",
        results: 0,
      });
    }

    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        countries,
      },
      message: "Countries Fetched Successfully",
      results: countries.length,
    });
  } catch (error: unknown) {
    console.log("GET COUNTRIES ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

export const setCountries = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existing = await Country.countDocuments();
    if (existing > 0) {
      return res.status(400).json({
        status: STATUSTEXT.FAIL,
        message: "Countries already exist in the database",
      });
    }
    const response = await fetch(
      `${process.env.REST_COUNTRIES_BASE_URL!}/all?fields=name,cca2`
    );
    const data = (await response.json()) as IRestCountry[];
    const formatted = data
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }))
      .sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
    await Country.insertMany(formatted);
    const countries = await Country.find();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        countries,
      },
      message: "Countries Added To The Database Successfully",
      results: countries.length,
    });
  } catch (error: unknown) {
    console.log("SET COUNTRIES ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
