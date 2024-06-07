import jwt from 'jsonwebtoken'

/**
 * API7:2023 – Falsificação de requisição do   lado   do   servidor.
 * O erro foi corrigido na verificação do token em rotas que não são publicas, em rotas que necessitam de um token para tem acesso.
 * O codigo pega o token que esta presente no cookie do navegador, e faz a verificação com a lib jwt, caso o exista o token e for valido o usuario acessa a rota, caso não exibe o status 403, não autorizado.
 */

export default function (req, res, next) {

  /*
    Algumas rotas, como /users/login, devem poder ser acessadas
    sem a necessidade de fornecimento de um token. Tais rotas
    são cadastradas no vetor bypassRoutes.
  */
  const bypassRoutes = [
    { url: '/users/login', method: 'POST' },
    { url: '/users', method: 'POST' }
  ]

  /*
    Verifica se a rota atual está cadastrada em bypassRoutes. Caso
    esteja, passa para o próximo middleware (next()) sem verificar
    o token.
  */
  for (let route of bypassRoutes) {
    if (route.url === req.url && route.method === req.method) {
      next()
      return
    }
  }

  let token = null
  token = req.cookies[process.env.AUTH_COOKIE_NAME]

  if (!token) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(403).end()

    const authHeaderParts = authHeader.split(' ')
    token = authHeaderParts[1]
  }

  // VERIFICAÇÃO E VALIDAÇÃO DO TOKEN
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {

    /* 
      Se há erro, significa que o token é inválido ou está expirado
      HTTP 403: Forbidden
    */
    if (error) return res.status(403).end()

    /*
      Se chegamos até aqui, o token está OK e temos as informações
      do usuário autenticado no parâmetro 'user'. Vamos guardá-lo
      dentro do 'req' para futura utilização
    */
    req.authUser = user

    // Continuamos para o próximo middleware
    next()

  })

}