import Joi from "joi";
import { Request, Response } from "express";

export const createApartment = (req: Request, res: Response, next: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    location: Joi.string().required(),
    unitsNumber: Joi.number().required(),
    number: Joi.string().required(),
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
