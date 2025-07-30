import { Request, Response } from "express";
import ApartmentModel from "../models/apartment";
import ProjectModel from "../models/project";
export const getApartments = async (req: Request, res: Response) => {
  try {
    const unitName = req.query.unitName as string;
    const unitNumber = req.query.unitNumber as string;
    const projectName = req.query.projectName as string;
    // If search parameters are provided, filter apartments
    if (projectName){
      const project = await ProjectModel.findOne({ name: { $regex: projectName, $options: "i" } });
      if (!project) { 
        return res.status(404).json({ message: "Project not found" });
      }
      const apartments = await ApartmentModel.find({ projectId: project._id });
      return res.status(200).json(apartments);
    }
    if (unitName || unitNumber ) {
      const apartments = await ApartmentModel.find({
        $or:[
          { name: { $regex: unitName, $options: "i" } },
          { number: { $regex: unitNumber, $options: "i" } },
        ]
      });
      return res.status(200).json(apartments);
    }
    // If no search parameter, return all apartments
    const apartments = await ApartmentModel.find();
    res.status(200).json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apartment = await ApartmentModel.findById(id);
    if (!apartment) { 
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json(apartment);
  } catch (error) {
    console.error("Error fetching apartment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const addApartment = async (req: Request, res: Response) => {
  try {
    const apartmentData = req.body;
    const newApartment = new ApartmentModel(apartmentData);
    await newApartment.save();
    res.status(201).json(newApartment);
  } catch (error) {
    console.error("Error adding apartment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApartment = await ApartmentModel.findByIdAndDelete(id);
    if (!deletedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
