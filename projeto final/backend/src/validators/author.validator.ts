import { body, header } from "express-validator"

const schema = [
    // header("id").exists().withMessage("Autor não encontrado."),
    body("name")
    .isString()
    .notEmpty().withMessage("O nome não pode ser vazio")
    .isLength({min: 5}).withMessage("O nome precisa ter ao menos 5 caracteres")
]

export { schema as authorSchema }