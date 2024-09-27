import { body } from "express-validator"
import { AppDataSource } from "../data-source"
import { Annotation } from "../entity/Annotation"

const schema = [
    body("annotationId")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
    .custom(async value => {
        const annotation = await AppDataSource.manager.findOneBy(Annotation, {id : value})

        if(!annotation) {
            throw new Error("Fichamento inexistente")
        }
    }),

    body("text")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório"),
    
    body("startingPage")
    .exists().withMessage("Campo obrigatório")
    .notEmpty().withMessage("Campo obrigatório")
]

export { schema as quoteSchema }
