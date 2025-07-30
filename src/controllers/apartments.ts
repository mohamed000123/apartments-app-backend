import { Request, Response } from "express";
import ApartmentModel from "../models/apartment";

export const getApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await ApartmentModel.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
