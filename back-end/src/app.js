/**
 * API9:2023 – Gerenciamento inapropriado do inventário.
 * Vulnerabilidade poderia ser evitado no projeto adicionando uma documentação onde contenha informação de versões da api e, sobre rotas.
 * Poderia ter cido utilizada a documentação do swagger para este controle, assim mitigando o uso de rotas ou versões desatualizadas.
 */


// Importa as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();
import helmet from 'helmet';
app.use(helmet())
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

// MIDDLEWARE DE AUTENTICAÇÃO
import auth from './middleware/auth.js'
app.use(auth)

/**************************************************
 * ROTAS
 **************************************************/

import userRouter from './routes/user.js'
app.use('/users', userRouter)

export default app;
