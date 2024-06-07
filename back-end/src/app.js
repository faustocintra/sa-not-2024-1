// Importa as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();

import helmet from 'helmet'
app.use(helmet())


import cors from 'cors'
app.use(cors({
  origin: process.env.FRONT_END_SERVER.split(','),
  credentials: true 
}))

    /* 
        👆👆
        Vulnerabilidade: API8:2023 – Má configuração de segurança.
        Parte desta vulnerabilidade foi evitada da linha 18 a linha 22.
        Nessas linhas configuramos o nosso Cors para receber apenas requisições de endereço 
        do nosso front-end.
        Com isso se algum atacante usar outro endereço para acessar algum endpoint da API,
        será bloqueado.
        No .env do back-end, coloquei todas as urls que devem ser aceitas para acessar
        a nossa API, separando cada url por virgula.
        FRONT_END_SERVER="http://localhost:5173,http://127.0.0.1:5173"
    */


app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
// MIDDLEWARE DE AUTENTICAÇÃO
import auth from './middleware/auth.js'
app.use(auth)

/**************************************************
 * ROTAS
 **************************************************/

import userRouter from './routes/user.js'
app.use('/users', userRouter)

export default app;
