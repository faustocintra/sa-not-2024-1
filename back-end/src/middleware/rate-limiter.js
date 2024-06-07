import { rateLimit } from 'express-rate-limit'

/**
 * API4:2023 - Consumo irrestrito de recursos
 * Erro corrigido ao limitar a quantidade de requisições, assim evitando um ataque de negação, ou de força bruta em caso de rotas de autenticação. O codigo limita a um numero maximo de 50 requisições.
 * Função sendo utilizada para controle de requisições na rota de /login no aquivo user.js.
 */

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimit