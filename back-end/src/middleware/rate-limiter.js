import { rateLimit } from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // Janela de 5 minutos
  max: 50, // Cada IP poderá fazer 50 acessos em 5 minutos
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
