import { Router } from 'express'
import controller from '../controllers/user.js'
import rateLimit from 'express-rate-limit'

const router = Router()

router.get('/me', controller.me)
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/login', rateLimit, controller.login)

export default router