import { rateLimit } from 'express-rate-limit'


// API4:2023 – Consumo irrestrito de recursos
// essa vulnerabilidade foi evitada no código, ao definir limites
// para taxa de acesso e tentativas de login, em  "windowMs: 5 * 60 * 1000,"" se tem uma janela de 5 minutos
// e em "max: 50,", se define que cada IP pode fazer no maximo 50 acessos na janela de tempo
// em user.js e app.js se chama o rateLimiter para o utilizar.


const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,   // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bloqueado pelo limitador de taxa de acesso',
  statusCode: 423
})

export default rateLimiter