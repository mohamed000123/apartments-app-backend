import { Request, Response } from "express";
import ProjectModel from "../models/project";

export const addProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    const newProject = new ProjectModel(projectData);
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
