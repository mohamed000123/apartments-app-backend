import Joi from "joi";
import { Request, Response } from "express";

export const createProject = (req: Request, res: Response, next: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    width: Joi.number().required(),
    meterPrice: Joi.number().required(),
    number: Joi.string().required(),
    projectId: Joi.string().required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .send(result?.error?.details?.map((detail) => detail.message));
    return;
  }
  next();
};
