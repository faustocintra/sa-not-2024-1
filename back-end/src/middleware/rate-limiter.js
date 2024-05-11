import {rateLimit} from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs: 5*60*1000,
    max:50,
    standardHeaders: true,
    legacyHeaders: false,
    message:'Bloqueado pelo Limitador de taxa de acesso',
    statusCode:423
})

export default rateLimiter