import { Router } from 'express'
import controller from '../controllers/user.js'
import rateLimiter from '../middleware/rate-limiter.js'
// import { checkOwnership } from '../middleware/checkOwnership'
// import { validateUser } from '../middleware/validateUser'

const router = Router()

router.get('/me', controller.me)
/*
Vulnerabilidade: API1:2023 - Ao adicionar a função checkOwnership podemos garantir
ao usuário que ele tenha acesso aos seus próprios dados.
*/

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
/*
Vulnerabilidade: API1:2023 - Adicionando a função checkOwnership ficará
garantido a segurnça que o usuário terá acesso somente aos seus dados.
*/
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/logout', controller.logout)
/*
Vulnerabilidade: API4:2023 - O número de logins será limitado pelo rateLimiter
evitando um consumo elevado de recursos.
*/

// Número de logins será limitado pelo rateLimiter
router.post('/login', rateLimiter, controller.login)

export default router

/*
O código original foi bem estruturado e gerencia as necessidades
básicas de um usuário, mas pode ser implementado com melhorias de segurança
para proteção contra vulnerabilidades comuns listadas pela lista OWASP.
*/