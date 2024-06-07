import { rateLimit } from 'express-rate-limit'

/* 
  Vulnerabilidade: API4:2023 – Consumo irrestrito de recursos
  Foi evitada ao implementar um limitador de taxa de acesso,
  restringindo o número de requisições que cada IP pode fazer em um determinado período de tempo.
*/
const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,   // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bloqueado pelo limitador de taxa de acesso',
  statusCode: 423
})

export default rateLimiter