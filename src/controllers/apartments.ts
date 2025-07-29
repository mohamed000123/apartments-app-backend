import { Request, Response } from 'express';


export const getApartments = (req: Request, res: Response) => {

  res.json({ message: 'List of apartments' });
};