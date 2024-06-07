import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
<<<<<<< HEAD
import { format, addMinutes } from 'date-fns'
import { ZodError } from 'zod'
import Login from '../models/Login.js'
import getUserModel from '../models/User.js'
=======
import sqlite3 from 'sqlite3'
import path from 'path'
import {fileURLToPath} from 'url'
import { error, log } from 'console'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = __dirname.replaceAll('\\','/').replace('/src/controllers','')
const dbPath = basePath + '/prisma/database/local.db';
//console.log({dbPath});

const db = new sqlite3.Database(dbPath, error => {
  if(error) console.error("Não foi possivel conectar ao banco " + dbPath);
  else console.log("Conectado com sucesso no banco " + dbPath);
})
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {

<<<<<<< HEAD
    // O model de validação para o usuário é criado com a validação da senha ativada
    const User = getUserModel(true)
    User.parse(req.body)

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    // Criptografando a senha
    req.body.password = await bcrypt.hash(req.body.password, 12)

    await prisma.user.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
<<<<<<< HEAD

    // HTTP 400: Bad Request
    if(error instanceof ZodError) res.status(400).send(error.issues)

    // HTTP 500: Internal Server Error
    else res.status(500).end()
=======
    // HTTP 500: Internal Server Error
    res.status(500).end()
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
  }
}

controller.retrieveAll = async function(req, res) {
  try {
<<<<<<< HEAD

    // Prevenção contra OWASP Top 10 API1:2023 - Broken Object Level Authorization
    // Somente usuários do nível administrador podem ter acesso à listagem de todos
    // os usuários
    // Caso contrário, retorna HTTP 403: Forbidden
    if(! req?.authUser?.is_admin) return res.status(403).end()
    /* 
        Vulnerabilidade: API1:2023 - Autorização de Nível de Objeto Quebrado
        No código acima, evita a primeira das vulnerabilidades, pois ele
        valida se o usuário é administrador, caso for ele ira exibir
        a lista dos usuários
    */

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    const result = await prisma.user.findMany()
    // Retorna o resultado com HTTP 200: OK (implícito)

    // Exclui o campo "password" do resultado
    for(let user of result) {
      if(user.password) delete user.password
    }

<<<<<<< HEAD
    /* 
        Vulnerabilidade: API3:2023 - Autorização de nível de propriedade de objeto quebrado
        A partir do trecho do código acima, mesmo depois da validação do nível do usuário,
        é retirado do retorno informações confidenciais que não deveriam acessados por
        nenhum outro usuário.
    */

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    res.send(result)
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    console.log({result})

    // Exclui o campo "password" do resultado
    if(result?.password) delete result.password
<<<<<<< HEAD
    /* 
        Vulnerabilidade: API3:2023 - Autorização de nível de propriedade de objeto quebrado
        A partir do trecho do código acima, mesmo depois da validação do nível do usuário,
        é retirado do retorno informações confidenciais que não deveriam acessados por
        nenhum outro usuário.
    */
=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

    // Resultado encontrado ~> HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Resultado não encontrado ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.update = async function(req, res) {
  try {

<<<<<<< HEAD
    // Prevenção contra OWASP Top 10 API1:2023 - Broken Object Level Authorization
    // Usuário que não seja administrador somente pode alterar o próprio cadastro
    if((! req?.authUser?.is_admin) && Number(req?.authUser?.id) !== Number(req.params.id)) {
      // HTTP 403: Forbidden
      res.status(403).end()
    }
    /* 
        Vulnerabilidade: API1:2023 - Autorização de Nível de Objeto Quebrado
        No código acima, evita a primeira das vulnerabilidades, pois ele
        valida se o usuário é administrador e se o id que está tentando 
        atualizar é igual ao seu, pois somente os administradores podem 
        atualizar qualquer usuário.
    */


    // O model para a validação do usuário será criado com validação de senha
    // se o campo 'password' tiver sido passado no req.body
    const User = getUserModel('password' in req.body)
    User.parse(req.body)

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    // Se tiver sido passado o campo 'password' no body
    // da requisição, precisamos criptografá-lo antes de
    // enviar ao banco de dados
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou ~> HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
<<<<<<< HEAD

    // HTTP 400: Bad Request
    if(error instanceof ZodError) res.status(400).send(error.issues)
    
    // HTTP 500: Internal Server Error
    else res.status(500).end()
=======
    // HTTP 500: Internal Server Error
    res.status(500).end()
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()
    // Não encontrou (e não excluiu) ~> vai para o catch
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

<<<<<<< HEAD
/*
  Função que obtém ou determina os parâmetros necessários para validar
  o login do usuário em função do número de tentativas e do tempo de 
  atraso após o esgotamento do número de tentativas permitidas
*/
function getUserLoginParams(user) {
  // Recuperamos os níveis de atraso da variável de ambiente
  const delayLevels = process.env.DELAY_LEVELS.split(',')
  
  // Determinamos o nível de atraso atual e o próximo nível 
  let currentDelayLevel, nextDelayLevel
  if(user.delay_level < delayLevels.length - 1) {
    currentDelayLevel = user.delay_level
    nextDelayLevel = currentDelayLevel + 1
  }
  else if(user.delay_level === delayLevels.length) {
    currentDelayLevel = user.delay_level
    nextDelayLevel = currentDelayLevel
  }
  else {
    currentDelayLevel = delayLevels.length - 1
    nextDelayLevel = delayLevels.length - 1
  }

  // Determinamos o números minutos de atraso do nível atual
  // e do próximo nível
  const currentDelayMinutes = Number(delayLevels[currentDelayLevel])
  const nextDelayMinutes = Number(delayLevels[nextDelayLevel])
  
  // Determinamos o momento do último login e a data/hora após as quais
  // o usuário poderá tentar fazer login novamente
  const lastLogin = user.last_attempt ? user.last_attempt : null
  const canLoginAfter = lastLogin ? addMinutes(lastLogin, currentDelayMinutes) : new Date(1900, 1, 1)

  // Determinamos o número de tentativas atuais e o próximo número de tentativas
  // Sendo atingido o máximo de tentativas, a contagem reinicia em 0
  const currentLoginAttempts = user.login_attempts
  const nextLoginAttempts = 
    currentLoginAttempts < Number(process.env.MAX_LOGIN_ATTEMPTS) ?
    currentLoginAttempts + 1 :
    0

  return {
    currentDelayLevel, 
    nextDelayLevel,
    currentDelayMinutes,
    nextDelayMinutes,
    lastLogin,
    canLoginAfter,
    currentLoginAttempts,
    nextLoginAttempts
  }
}

controller.login = async function(req, res) {
  try {

    // Invoca a validação dos campos definida no model Login
    Login.parse(req.body)

=======
controller.login = function(req, res) {

  const query = `select  * from user where username = '${req.body.username}'`

  console.log(query);

  db.get(query, [], async (error, user) => {
    console.log(user);
    if(error) return res.status(401).end()
    
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)
    if(! passwordMatches) return res.status(401).end()
    
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,   // Senha de criptografia do token
      { expiresIn: '24h' }  // Prazo de validade do token
    )

    res.send({token})

  })

  /*try {
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    // Busca o usuário pelo username
    const user = await prisma.user.findUnique({
      where: { username: req.body.username.toLowerCase() }
    })

<<<<<<< HEAD
    /* 
      Vulnerabilidade: API10:2023   –   Consumo   inseguro   de   APIs.
      Esta vulnerabilidade foi evitada no código acima ao ser utilizado um ORM,
      que nos ajuda a evitar entradas inapropriadas do usuário como SQL Injection
    */

=======
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    // Se o usuário não for encontrado ~>
    // HTTP 401: Unauthorized
    if(! user) return res.status(401).end()

<<<<<<< HEAD
    // Busca os parâmetros que serão usados na validação de tentativas
    // e intervalo de login
    const {
      nextDelayLevel,
      currentDelayMinutes,
      canLoginAfter,
      currentLoginAttempts,
      nextLoginAttempts
    } = getUserLoginParams(user)

    console.log(`Tentativas: ${currentLoginAttempts}, pode tentar após ${format(canLoginAfter, "PPpp")}`)

    // Usuário encontrado, precisamos verificar se ele ainda tem
    // tentativas de login disponíveis ou se o tempo de atraso já expirou
    if(user.login_attempts >= Number(process.env.MAX_LOGIN_ATTEMPTS) &&
      new Date() < canLoginAfter) {
      // Avisa que o usuário poderá tentar de novo após XXX milissegundos
      res.setHeader('Retry-After', currentDelayMinutes * 60 * 1000)
      // HTTP 429: Too Many Attempts
      return res.status(429).end()
    }

    /* 
        Vulnerabilidade: API2:2023 - Autenticação quebrada
        A partir dos trechos de código acima, é realizado a validação do 
        número de tentativas de login, que ao execeder o limite, é adicionado
        uma certa quantitade de tempo, evitando o ataque de força bruta.
    */

    // Usuário encontrado, vamos conferir a senha
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)

    // Se a senha estiver incorreta
    if(! passwordMatches) {
      // Incrementa o número de tentativas do usuário
      if(currentLoginAttempts < Number(process.env.MAX_LOGIN_ATTEMPTS) - 1) {
        await prisma.user.update({
          where: { username: req.body.username.toLowerCase() },
          data: { 
            login_attempts: nextLoginAttempts,
            last_attempt: new Date()   // Hora atual
          }
        })
      }
      else {
        // Igualou o número máximo de tentativas, sobe o nível
        // de espera para novas tentativas
        await prisma.user.update({
          where: { username: req.body.username.toLowerCase() },
          data: { 
            login_attempts: nextLoginAttempts,
            delay_level: nextDelayLevel,
            last_attempt: new Date()   // Hora atual
          }
        })
      }
      // HTTP 401: Unauthorized
      return res.status(401).end()
    }

    // Se chegamos até aqui, username + password estão OK
    // Resetamos o número de tentativas e o nível de espera
    await prisma.user.update({
      where: { username: req.body.username.toLowerCase() },
      data: { 
        login_attempts: 0,
        delay_level: 0,
        last_attempt: new Date()   // Hora atual
      }
    })

=======
    // Usuário encontrado, vamos conferir a senha
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)

    // Se a senha estiver incorreta ~>
    // HTTP 401: Unauthorized
    if(! passwordMatches) return res.status(401).end()

    // Se chegamos até aqui, username + password estão OK
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
    // Vamos criar o token e retorná-lo como resposta

    // O token inclui as informações do usuário. Vamos excluir o campo
    // da senha antes de prosseguir
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,   // Senha de criptografia do token
      { expiresIn: '24h' }  // Prazo de validade do token
    )

<<<<<<< HEAD
    // Formamos o cookie para enviar ao front-end
    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      httpOnly: true,   // O cookie ficará inacessível para JS
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000   // 24h em milissegundos
    })

    // Retorna o token com status HTTP 200: OK (implícito)
    //res.send({token})

    // O token não é mais enviado na resposta
    // A resposta agora é simplesmente HTTP 204: No Content
    res.status(204).end()
=======
    // Retorna o token com status HTTP 200: OK (implícito)
    res.send({token})
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a

  }
  catch(error) {
    console.error(error)
<<<<<<< HEAD
    // HTTP 400: Bad Request
    if (error instanceof ZodError) res.status(400).send(error.issues)
    
    // HTTP 500: Internal Server Error
    else res.status(500).send(error)
  }
}

controller.logout = function(req, res) {
  // Apaga o cookie que armazena o token de autorização
  res.clearCookie(process.env.AUTH_COOKIE_NAME)
  res.status(204).end()
}

controller.me = function(req, res) {

  // Se houver usuário autenticado, ele foi salvo em req.authUser
  // pelo middleware auth quando este conferiu o token. Portanto,
  // para enviar informações do usuário logado ao front-end, basta
  // responder com req.authUser
  if(req.authUser) res.send(req.authUser)

  // Se req.authUser não existir, significa que não há usuário
  // autenticado
  // HTTP 401: Unauthorized
  else res.status(401).end()
=======
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }*/
>>>>>>> 9e5ca65e68ec605b359bcab584ef850069369e9a
}

export default controller