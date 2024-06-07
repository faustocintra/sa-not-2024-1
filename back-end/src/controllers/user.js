import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { format, addMinutes } from 'date-fns'
import Login from '../models/Login.js'
import { ZodError } from 'zod'
import getUserModel from '../models/User.js'

const controller = {}   // Objeto vazio

controller.create = async function (req, res) {
  try {

    const User = getUserModel(true)
    User.parse(req.body)

    // Criptografando a senha
    req.body.password = await bcrypt.hash(req.body.password, 12)

    await prisma.user.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch (error) {
    console.error(error)

    if (error instanceof ZodError) res.status(400).send(error.issues)
    // HTTP 500: Internal Server Error
    else res.status(500).end()
  }
}

controller.retrieveAll = async function (req, res) {
  try {

    // Prevenção contra OWASP Top 10 API1:2023 - Broken Object Level Authorization
    // Somente usuários do nível administrador podem ter acesso à listagem de todos
    // os usuários
    // Caso contrário, retorna HTTP 403: Forbidden
    if (!req?.authUser?.is_admin) return res.status(403).end()

    const result = await prisma.user.findMany()
    // Retorna o resultado com HTTP 200: OK (implícito)

    // Exclui o campo "password" do resultado
    for (let user of result) {
      if (user.password) delete user.password
    }

    res.send(result)
  }
  catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    console.log({ result })

    // Exclui o campo "password" do resultado
    if (result?.password) delete result.password

    // Resultado encontrado ~> HTTP 200: OK (implícito)
    if (result) res.send(result)
    // Resultado não encontrado ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.update = async function (req, res) {
  try {

    // Prevenção contra OWASP Top 10 API1:2023 - Broken Object Level Authorization
    // Usuário que não seja administrador somente pode alterar o próprio cadastro
    if ((!req?.authUser?.is_admin) && Number(req?.authUser?.id) !== Number(req.params.id)) {
      // HTTP 403: Forbidden
      res.status(403).end()
    }

    const User = getUserModel('password' in req.body)
    User.paser(req.body)

    // Se tiver sido passado o campo 'password' no body
    // da requisição, precisamos criptografá-lo antes de
    // enviar ao banco de dados
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // Encontrou e atualizou ~> HTTP 204: No Content
    if (result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch (error) {
    console.error(error)
    if (error instanceof ZodError) res.status(400).send(error.issues)

    // HTTP 500: Internal Server Error
    else res.status(500).end()
  }
}

controller.delete = async function (req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()
    // Não encontrou (e não excluiu) ~> vai para o catch
  }
  catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

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
  if (user.delay_level < delayLevels.length - 1) {
    currentDelayLevel = user.delay_level
    nextDelayLevel = currentDelayLevel + 1
  }
  else if (user.delay_level === delayLevels.length) {
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

controller.login = async function (req, res) {
  try {
    Login.parse(req.body)

    // Busca o usuário pelo username
    const user = await prisma.user.findUnique({
      where: { username: req.body.username.toLowerCase() }
    })

    // Se o usuário não for encontrado ~>
    // HTTP 401: Unauthorized
    if (!user) return res.status(401).end()

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
    if (user.login_attempts >= Number(process.env.MAX_LOGIN_ATTEMPTS) &&
      new Date() < canLoginAfter) {
      // Avisa que o usuário poderá tentar de novo após XXX milissegundos
      res.setHeader('Retry-After', currentDelayMinutes * 60 * 1000)
      // HTTP 429: Too Many Attempts
      return res.status(429).end()
    }

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

    /* 
        👆👆
        Vulnerabilidade: API2:2023 – Falha de autenticação.
        Qualquer forma que forneça o token do usuário a um atacante entra nesta regra.
        Esta vulnerabilidade foi evitada da linha 206 a linha 256.
        Nessas linhas evitamos que o atacante tente acertar a
        senha de algum usuário fazendo um ataque de força bruta. 
        Toda vez que a senha digitada for incorreta, é acrescentado 1 ao número de tentativas,
        e após uma certa quantidade de vezes, aquele usuário fica bloqueado de fazer tentativas
        de login por um tempo.
        Para atribuir este tempo, fizemos níveis de delay, quanto mais alto o nível, mais tempo
        aquele usuário ficara bloqueado.
    */

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

    // Vamos criar o token e retorná-lo como resposta

    // O token inclui as informações do usuário. Vamos excluir o campo
    // da senha antes de prosseguir
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,   // Senha de criptografia do token
      { expiresIn: '24h' }  // Prazo de validade do token
    )

    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'Strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    })

    // Retorna o token com status HTTP 200: OK (implícito)
    // res.send({token})

    res.status(204).end()

  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    if (error instanceof ZodError) res.status(400).send(error.issues)
      
    res.status(500).send(error)
  }
}

controller.logout = function(req, res) {
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
}

export default controller