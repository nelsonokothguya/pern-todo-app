import { Request, Response, NextFunction } from "express";
import { ValidationError, NotFoundError } from './customErrors';

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  if (err instanceof ValidationError) {
    res.status(400);
    res.send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(404);
    res.send(err.message);
  } else {
    res.status(500);
    res.send("Oops, something went wrong");
  }
};
