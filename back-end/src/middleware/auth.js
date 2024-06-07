import jwt from 'jsonwebtoken'

export default function(req, res, next) {

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
  for(let route of bypassRoutes) {
    if(route.url === req.url && route.method === req.method) {
      next()
      return
    }
  }

  const token = req.cookies[process.env.AUTH_COOKIE_NAME]
  console.log({AUTH_COOKIE : token});

  if(!token) {
    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(403).end()

    const authHeaderParts = authHeader.split(' ')
    token = authHeaderParts[1]
  }
  
  // VERIFICAÇÃO E VALIDAÇÃO DO TOKEN
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    /* 
        Vulnerabilidade: API2:2023 - Autenticação quebrada
        A partir do trecho do código acima, é realizado a validação do 
        token de autenticação que verifica se o mesmo é válido.
    */


    /* 
      Se há erro, significa que o token é inválido ou está expirado
      HTTP 403: Forbidden
    */
    if(error) return res.status(403).end()

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