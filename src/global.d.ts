import type { Response } from 'express';
import type { ResponseBody } from './types/response';

declare module 'express' {
  interface Request {
    user: string;
  }

  type Send = (body?: ResponseBody) => Response<ResponseBody>;
  
  interface Response<T> {
    json: Send;
  }
}
