import createHttpError from "http-errors";
export function checkPermission(...anyPermissions) {
    return function (req, res, next) {
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
        const hasPermission = anyPermissions.some((permission) => user.permissions?.includes(permission));
        if (!hasPermission) {
            return next(createHttpError(403, "Zugriff verweigert"));
        }
        return next(); // Erforgreich
    };
}
