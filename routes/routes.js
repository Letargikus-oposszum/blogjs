import express from "express"
import * as Controllers from "../controllers/controllers.js"
const router =express.Router()

router.get('/', Controllers.getblog)
router.get('/:id', Controllers.getblogById)
router.post('/', Controllers.createblog)
router.put('/:id',Controllers.updateblog)
router.delete('/:id', Controllers.deleteblog)

export default router