import { body, header } from "express-validator"

const schema = [
    // header("id").exists().withMessage("Usuário não encontrado."),
    body("name")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:3, max:50}).withMessage("O nome deve possuir entre 2 e 50 caracteres"),
    body("email")
    .notEmpty().withMessage("Campo obrigatório")
    .isEmail().withMessage("Insira um e-mail válido").
    isLength({min:10}),
    body("password")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:8}).withMessage("A senha deve ter ao menos 8 caracteres")
]

export { schema as userSchema }