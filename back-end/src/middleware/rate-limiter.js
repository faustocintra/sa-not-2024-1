import { rateLimit } from 'express-rate-limit'

/* 
    Vulnerabilidade: API8:2023 – Má Configuração de Segurança
    Esta configuracao foi evitada no código pq foi configurado um limitador com tempo de 5 minutos e um numero maximo de requisições
    que no caso foi 50 por ip oq ajuda a previnir ataques gerando varias requisições evitando a queda da aplicação
*/

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bloqueado pelo limitador de taxa de acesso',
  statusCode: 423
})

export default rateLimiter