import { Router } from 'express'
import controller from '../controllers/user.js'
<<<<<<< HEAD
import rateLimiter from '../middleware/rate-limiter.js'

const router = Router()

router.get('/me', controller.me)
=======

const router = Router()

>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
<<<<<<< HEAD
router.post('/login', rateLimiter, controller.login)
router.post('/logout', controller.logout)
=======
router.post('/login', controller.login)
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

export default router