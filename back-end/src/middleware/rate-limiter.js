import { rateLimit } from 'express-rate-limit'

/*
Vulnerabilidade: API4:2023 - Consumo irrestrito de recursos
Ao definir um limite de acesso por IP, deve ser evitado um ataque de negação de serviço, que poderia ser causado por um grande número de acessos de um IP.
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