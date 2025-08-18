// types/jwt.ts
export interface JwtPayload {
  _id?: string;
  email?: string;
  roles?: string[];
  permissions?: string[];
}