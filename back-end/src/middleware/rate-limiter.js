/*
   API4:2023 – Consumo irrestrito de recursos
   
   o rateLimit limita a quantidade de requisições por IP, evitando ataques DoS com objetivo de sobrecarregar ou derrubar o sistema.
*/

import { rateLimit } from 'express-rate-limit'

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,   // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bloqueado pelo limitador de taxa de acesso',
  statusCode: 423
})

export default rateLimiter