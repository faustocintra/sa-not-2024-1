// Importa as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();

// Helmet é um pacote que provê várias medidas de segurança,
// como esconder a tecnologia empregada pelo back-end
// (cabeçalho X-Powered-By)
/* 
  API 8 - Má configuração de segurança 
  O Helmet protege os cabeçalhos HTTP retornados pelo sistema, seu uso vai impedir vulnerabilidades de configuração.

  O Helmet ocultará por exemplo, as tecnologias que foram utilizadas nesse projeto.
*/
import helmet from 'helmet'
app.use(helmet())

/*
  API7:2023 – Falsificação de requisição do lado do servidor.
  Através de cookies, o Cors vai permitir que apenas o front-end deste projeto consiga enviar requisições ao back-end.

*/

import cors from 'cors'
app.use(cors({
  origin: process.env.FRONT_END_SERVER.split(','),
  credentials: true   // Aceita cookies na requisição
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
//app.use("/users", usersRouter);


/*
  API2:2023 – Falha de autenticação

  O auth atua no controle de autoridade dos usuários

  Exemplo de uso: no arquivo user.js presente na pasta controllers do back-end, o auth está sendo
  utilizado para garantir que apenas usuarios administradores tenham acesso aos usuários cadastrados
  no sistema.
*/
// MIDDLEWARE DE AUTENTICAÇÃO
import auth from './middleware/auth.js'
app.use(auth)

// MIDDLEWARE DE LIMITAÇÃO DE TAXA DE ACESSO

// Todas as rotas serão afetadas
// import rateLimiter from './middleware/rate-limiter.js'
// app.use(rateLimiter)

/**************************************************
 * ROTAS
 **************************************************/

import userRouter from './routes/user.js'
app.use('/users', userRouter)

export default app;