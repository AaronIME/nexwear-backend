import { Request, Response } from 'express';
import { CustomError } from '../domain/entities/errors/custom.error';

export const handleError = (error: unknown, res: Response): void => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error(error);
  console.error({error});
  res.status(500).json({ error: 'Internal server error' });
};
