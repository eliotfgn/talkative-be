import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import logger from '../utils/logger';

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(403).json({
      success: false,
      message: 'No token provided.',
    });
    
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    let payload: JwtPayload = verifyAccessToken(token) as JwtPayload;

    request.user = payload.sub || '';
    
    next();
    
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      response.status(403).json({
        success: false,
        message: error.name === 'TokenExpiredError' ? 'Token expired.' : 'Token malformed.',
      });
      
      return;
    }
    
    response.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
    });
    
    logger.error(error.message);
  }
}
