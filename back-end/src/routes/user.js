import { Router } from 'express'
import controller from '../controllers/user.js'
import rateLimiter from '../middleware/rate-Limiter.js'

const router = Router()

router.get('/me', controller.me)
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

//Numero de logins será limitado pelo rateLimiter
router.post('/login', rateLimiter,controller.login)

export default router