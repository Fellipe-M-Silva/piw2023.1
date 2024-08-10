import { body } from "express-validator"

const schema = [
    body("annotation")
    .notEmpty(),
    body("text")
    .notEmpty().withMessage("Campo obrigatório"),
    body("startingPage")
    .notEmpty().withMessage("Campo obrigatório")
]

export { schema as quoteSchema }
