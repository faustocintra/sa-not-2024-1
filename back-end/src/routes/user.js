import { Router } from "express";
import controller from "../controller/user.js";

const router = Router();

router.post('/', controller.create)
router.post('/login', controller.login)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete )

export default router