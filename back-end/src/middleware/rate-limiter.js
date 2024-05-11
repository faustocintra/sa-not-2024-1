import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Janela de 5 minutos
    max: 50, // Cada IP poderá fazer 50 requisições nesse período
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Bloqueado pelo limitador de taxa de acesso.',
    statusCode: 429
})

export default rateLimiter;