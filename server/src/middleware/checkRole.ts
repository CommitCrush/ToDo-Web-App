import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export function checkRole(targetRole: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    //Nutzer ist nicht Authentifiziert(Kein Token)
    if (!req.user) {
      return next(createHttpError(401, "User nicht authentifiziert"));
    }
    //Nutzer hat nicht die erforderliche Rolle
    if (!req.user?.roles?.includes(targetRole)) {
      //if (!req.user?.roles? !== targetRole) }
      return next(createHttpError(403, "User nicht authentifiziert"));
    }
    //Zugriff ist erlaud, nächster Händler wird aufgerufen
    return next();
  };
}
