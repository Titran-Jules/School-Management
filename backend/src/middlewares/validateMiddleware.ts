import { Request, Response,NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateBody = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            console.log("Erreurs Zod :", error);
            if (error instanceof ZodError) {
                return res.status(422).json({
                    message: 'Data invalid',
                    errors: error.issues.map(err => ({
                        field: err.path.join('-'),
                        message: err.message,
                    })),
                });
            }
            return res.status(500).json({ message: 'Error during validation' });
        }
    }
}