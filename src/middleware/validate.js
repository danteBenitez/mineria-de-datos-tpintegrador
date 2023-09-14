import { validationResult } from "express-validator"

export function validate(validations) {
    return async (req, res, next) => {
        for (const schema of validations) {
            await schema.run(req);
        }
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: errors.array()
        })
    }
}