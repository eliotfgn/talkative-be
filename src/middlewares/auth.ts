import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import logger from '../utils/logger';

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const auth = request.headers.authorization;
  let token: string;

  if (!auth) {
    response.status(403).json({
      success: false,
      message: 'No token provided.',
    });
    return;
  }

  token = auth.split(' ')[1];

  try {
    let payload: JwtPayload = verifyAccessToken(token) as JwtPayload;
    // @ts-ignore
    request.user = payload.sub;
    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      response.status(403).json({
        success: false,
        message: 'Malformed or expired token.',
      });
    } else if (error instanceof Error) {
      response.status(500).json({
        success: false,
        message: 'An unexpected error occurred.',
      });
      logger.error(error.message);
    }
  }
}
