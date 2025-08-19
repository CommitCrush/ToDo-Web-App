import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Permission } from "../types/permissions.js";

export function checkPermission(...anyPermissions: Permission[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) {
      return next(createHttpError(401, "User nicht authentifiziert"));
    }
    //nur eine Permission
    /* if (!req.user?.permissions?.includes(permission)) {
      return next(createHttpError(403, "User nicht authorisiert"));
    } */
    // very => Alle Berichtigungen müssen erfüllt sein (UND-Logik)
    //some => Mindestens eine Berechtigung muss erfüllt sein (ODER-Logik)
    // ZB. VIEWER_USER oder UPDATE_USER
    const hasPermission = anyPermissions.some((permission) =>
      user.permissions?.includes(permission)
    );

    if (!hasPermission) {
      return next(createHttpError(403, "Zugriff verweigert"));
    }

    return next(); // Erforgreich
  };
}
