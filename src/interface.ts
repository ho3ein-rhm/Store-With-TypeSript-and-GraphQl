import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export interface IMycontext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}
