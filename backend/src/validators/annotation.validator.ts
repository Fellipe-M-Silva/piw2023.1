import { body } from "express-validator"

const schema = [
    body("isPublic")
    .notEmpty(),
    body("user")
    .notEmpty(),
    body("work")
    .notEmpty().withMessage("Campo obrigatório")
]

export { schema as annotationSchema }