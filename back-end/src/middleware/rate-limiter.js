import { rateLimit } from 'express-rate-limit'

/*
  OWASP API4:2023 - Consumo irrestrito de recursos
  Para limitar o número de solicitações que podem ser feitas pelo cliente para a API, usa-se a biblioteca 'express-rate-limit', nesse codigo ainda limita um tempo no qual o usuario nao pode fazer solicitações
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