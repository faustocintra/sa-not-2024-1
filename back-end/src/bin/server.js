#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app.js";
import chalk from "chalk";
import { createServer } from "http";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

/*
Vulnerabilidade: API8:2023 – Má configuração de segurança
Esta vulnerabilidade foi evitada ao utilizar a variável de ambiente para definir a porta. 
Isso evita a exposição de informações sensíveis diretamente no código.
*/
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

/*
Vulnerabilidade: API4:2023 – Consumo irrestrito de recursos
Esta vulnerabilidade deveria ter sido evitada no código implementando limites de taxa 
(rate limiting) e restrições de uso para evitar que recursos sejam consumidos de forma excessiva.
*/
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

/*
Vulnerabilidade: API9:2023 – Gerenciamento inapropriado do inventário
Esta vulnerabilidade poderia ser evitada ao manter um inventário atualizado dos endpoints da API e suas versões, 
assim como documentar adequadamente a API para garantir que endpoints obsoletos não fiquem expostos.
*/
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe  ${addr}` : `port ${addr.port}`;
  console.log(chalk.cyan(`Listening on ${bind}.`));
}
