import { Request, Response } from "express";
import ApartmentModel from "../models/apartment";
import ProjectModel from "../models/project";


export const getApartments = async (req: Request, res: Response) => {
  try {
    const unitName = req.query.unitName as string;
    const unitNumber = req.query.unitNumber as string;
    const projectName = req.query.projectName as string;

    let apartments = [];
    if (projectName) {
      const project = await ProjectModel.findOne({
        name: { $regex: projectName, $options: "i" },
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      apartments = await ApartmentModel.find({ projectId: project._id }).lean();
    } else if (unitName || unitNumber) {
      apartments = await ApartmentModel.find({
        $or: [
          { name: { $regex: unitName || "", $options: "i" } },
          { number: { $regex: unitNumber || "", $options: "i" } },
        ],
      }).lean();
    } else {
      apartments = await ApartmentModel.find().lean();
    }

    const BASE_URL = process.env.BASE_URL  
    const apartmentsWithFullImageUrls = apartments.map((apt) => ({
      ...apt,
      images: (apt.images || []).map((filename: string) => `${BASE_URL}/uploads/${filename}`),
    }));

    res.status(200).json(apartmentsWithFullImageUrls);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apartment = await ApartmentModel.findById(id).lean()
    if (!apartment) { 
      return res.status(404).json({ message: "Apartment not found" });
    }
    // Converting image filenames to full URLs
    const BASE_URL = process.env.BASE_URL  
    apartment.images = apartment.images.map((filename: string) => {
      return `${BASE_URL}/uploads/${filename}`;
    });
    res.status(200).json(apartment);
  } catch (error) {
    console.error("Error fetching apartment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const addApartment = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      location,
      width,
      meterPrice,
      number,
      projectId,
    } = req.body;

    const imageFiles = req.files as Express.Multer.File[]; 
    const imagePaths = imageFiles.map((file) => file.filename); 

    const apartment = new ApartmentModel({
      name,
      description,
      price,
      location,
      width,
      meterPrice,
      number,
      projectId,
      images: imagePaths,
    });

    await apartment.save();

    res.status(201).json({ message: "Apartment created", apartment });
  } catch (error) {
    console.log("Error creating apartment:", error);
    res.status(500).json({ message: "Error creating apartment", error });
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
