import jwt from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '8h',
  });
}

export function verifyAccessToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
}
