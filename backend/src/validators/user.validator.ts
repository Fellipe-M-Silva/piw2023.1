import { body } from "express-validator"

const schema = [
    body("name")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:3, max:20}).withMessage("O nome deve possuir entre 2 e 20 caracteres"),
    body("email")
    .notEmpty().withMessage("Campo obrigatório")
    .isEmail().withMessage("Insira um e-mail válido").
    isLength({min:10}),
    body("password")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:8, max:30}).withMessage("A senha deve ter entre 8 e 30 caracteres")
]

export { schema as userSchema }