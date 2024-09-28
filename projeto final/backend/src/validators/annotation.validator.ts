import { body, header, param } from "express-validator"

const postSchema = [
    body("userId")
    .exists().withMessage("Campo obrigatório"),
    // .isEmpty().withMessage("Campo obrigatório"),

    body("creatorUsername")
    .exists().withMessage("Campo obrigatório"),
    // .isEmpty().withMessage("Campo obrigatório"),

    // body("isPublic")
    // .exists().withMessage("Campo obrigatório"),

    body("workTitle")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório"),

    body("workAuthors")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
    .isString().withMessage("Informação inválida")

]

const putSchema = [
    param("id")
    .exists().withMessage("Fichamento não encontrado"),

    body("isPublic")
    .exists().withMessage("Campo obrigatório"),

    body("workTitle")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório"),

    body("workAuthors")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")

]

export { postSchema as postAnnotationSchema, putSchema as putAnnotationSchema }