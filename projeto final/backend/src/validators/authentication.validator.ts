import { body } from "express-validator"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const registerSchema = [
    body("name")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:3, max:50}).withMessage("O nome deve possuir entre 2 e 50 caracteres"),

    body("email")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
    .isEmail().withMessage("Insira um e-mail válido")
    .custom(async value => {
        const user = await AppDataSource.manager.findOneBy(User, {email : value})
        if (user) {
            throw new Error("Este e-mail já está cadastrado.")
        }
    }),

    body("username")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório").
    isLength({min: 4, max: 30}).withMessage("O nome de usuário deve possuir entre 4 e 30 caracteres")
    .custom(async value => {
        const user = await AppDataSource.manager.findOneBy(User, {username: value}) 
        if (user) {
            throw new Error("Este nome de usuário já está cadastrado.")
        }
    }),
    
    body("password")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:8}).withMessage("A senha deve ter ao menos 8 caracteres")
]

const loginSchema = [
    body("login")
    .notEmpty().withMessage("Campo obrigatório")
    .custom(async value => {
        const user = await AppDataSource.manager.findOne(User, {
            where: [
                {email : value},
                {username: value}
            ]
        })

        
        console.log(user)
        
        if (!user.email || !user.username) {
            throw new Error("E-mail ou nome de usuário inválido")
        }
    }),

    body("password")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
]

export { registerSchema, loginSchema }