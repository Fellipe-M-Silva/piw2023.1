import { body, header } from "express-validator"

const schema = [
    // header("id").exists().withMessage("Obra não encontrada."),
    // body("title")
    // .notEmpty().withMessage("Campo obrigatório"),
    // body("authors")
    // .notEmpty().withMessage("Campo obrifatório"),
]

export { schema as workSchema }