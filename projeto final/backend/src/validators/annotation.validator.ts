import { body, header } from "express-validator"

const schema = [
    header("id").exists().withMessage("Fichamento não encontrado."),
    body("isPublic")
    .notEmpty(),
    body("user")
    .notEmpty(),
    body("work")
    .notEmpty().withMessage("Campo obrigatório")
]

export { schema as annotationSchema }