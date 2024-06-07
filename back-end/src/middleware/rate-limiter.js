import { rateLimit } from 'express-rate-limit';

/*
  Vulnerabilidade - API4:2023 – Consumo irrestrito de recursos

  Essa vulnerabilidade foi evitado aqui, pois é configurado para que o IP
  do usuário não possa fazer mais que 50 logins no período de 5 minutos.
  Assim, evitando ataques enviando ficam enviando várias requisições para
  o banck-end e banco de dados. Consequentemente sobrecarregando e derrubando
  o sistema. 
*/
const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Bloqueado pelo limitador de taxa de acesso',
  statusCode: 423
});

export default rateLimiter;