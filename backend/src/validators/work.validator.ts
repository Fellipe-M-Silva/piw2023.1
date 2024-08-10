import { body } from "express-validator"

const schema = [
    body("title")
    .notEmpty().withMessage("Campo obrigatório"),
    body("authors")
    .notEmpty().withMessage("Campo obrifatório"),
]

export { schema as workSchema }