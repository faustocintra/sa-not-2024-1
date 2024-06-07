import { rateLimit } from "express-rate-limit";

/**
 API4:2023 – Consumo irrestrito de recursos.
 Esta vulnerabilidade foi evitado no código ao
 implementar limites de taxa para reduzir o
 consumo irrestrito de recursos,
 prevenindo negação de serviço.
 */

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
  message: "Bloqueado pelo limitador de taxa de acesso",
  statusCode: 423,
});

export default rateLimiter;
