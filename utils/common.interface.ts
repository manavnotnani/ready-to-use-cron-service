import { Request } from "express";

export interface PromiseResolve {
  status: number,
  error: boolean,
  message: string,
  data?: any,
}

export interface PromiseResolveWithTotalDocs extends PromiseResolve {
  totalDocs?: number,
  page?:number
}

export interface JoiValidationResult {
  error: boolean;
  value: any;
  message?: string;
}

export interface RequestResolve extends Request{
  files: any;
}
export interface IOptions {
  page: number;
  limit: number
}