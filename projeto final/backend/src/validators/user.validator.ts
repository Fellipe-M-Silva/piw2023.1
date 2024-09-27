import { body, param } from "express-validator"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const postSchema = [
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

const putSchema = [
    param("id")
    .exists().withMessage("Usuário não encontrado"),

    body("name")
    .exists()
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:3, max:50}).withMessage("O nome deve possuir entre 2 e 50 caracteres"),

    body("email")
    .exists()
    .notEmpty().withMessage("Campo obrigatório")
    .isEmail().withMessage("Insira um e-mail válido")
    .isLength({min:10})
    .custom(async (value, {req}) => {
        const id = req.params.id
        const currentUser = await AppDataSource.manager.findOneBy(User, { id: id })
        const user = await AppDataSource.manager.findOneBy(User, {email: value}) 
        
        if (user && user.id != currentUser.id) {
            throw new Error("Este e-mail já está cadastrado.")
        }
    }),

    body("username")
    .exists()
    .isLength({min:4, max:30})
    .notEmpty().withMessage("Campo obrigatório").
    isLength({min: 4, max: 30}).withMessage("O nome de usuário deve possuir entre 5 e 30 caracteres")
    .custom(async (value, { req }) => {
        const id = req.params.id
        const currentUser = await AppDataSource.manager.findOneBy(User, { id: id })
        const user = await AppDataSource.manager.findOneBy(User, { username: value }) 
        if (user && user.id != currentUser.id) {
            throw new Error("Este nome de usuário já está cadastrado.")
        }
    }),
    
    body("password")
    .exists()
    .notEmpty().withMessage("Campo obrigatório")
    .isLength({min:8}).withMessage("A senha deve ter ao menos 8 caracteres")
    
]

const findSchema = [
    param("id")
    .exists().withMessage("Usuário não encontrado"),
]

export { postSchema as postUserSchema, findSchema as findUserSchema, putSchema as putUserSchema }