import { isHttpError } from "http-errors";
/* export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Fehler", err.message);
  const status = err.status || 500;

  const message = err.message || "Ein interner Fehler ist aufgetreten";

  res.status(status).json({ message });
};
 */
// middlewares/errorHandler.ts
export function errorHandling(error, req, res, next) {
    console.error("Fehler", error);
    // Fehler aus createHttpError
    if (isHttpError(error)) {
        //Fehler stammt von createHttpError
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    // Prügt, ob das übergebene error ein Instanzr von Js Error-Klasse ist
    //TypeError, ReferenzError, SyntaxError
    // ValidsationsError
    // Algemeiner JS-Fehler
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
    }
    // Fallback, falls der Fehler kien richtiger Error ist
    res.status(500).json({
        message: "Unbekannter Fehler",
    });
}
