import { rateLimit } from 'express-rate-limit'

 /*API8:2023 – Má configuração de segurança.
 
    Dados de configuração, devem estar contidos em um arquivo .env protegido
    como windowMs, max
    para que não sejam expostos diretamente no código fonte.
    podendo ter alterações intencionais ou não por um desenvolvedor
    e esta passar em um code review sem a devida atenção
    podendo no caso deste código deixar o código suscetivel a ataques
    de negação de serviço
    para corrigir deve ser mover os dados de configuração para o env
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