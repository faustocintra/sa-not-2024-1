import rateLimit, { rateLimit } from 'express-rate-limit'

const rateLimit = rateLimit({
    windowMs: 5 * 60 * 100, // janela de 5 minutos
    max: 50, // cada Ip podera fazer 50 acessos em 5 minutos
    standardheaders: true,
    legacyHeaders: false, 
    message: 'Bloqueado pelo limitador de taxa de acesso',
    statusCode: 423
})

export default rateLimiter