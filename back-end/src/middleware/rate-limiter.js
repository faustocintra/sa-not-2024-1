import { rateLimit } from 'express-rate-limit'


const raterLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50, 
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Bloqueado pelo limitador de taxa de acesso',
    statusCode: 423
})

 export default raterLimiter