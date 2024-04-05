import prisma from "../database/client.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
    try {
        
        // Criptografando a senha
        req.body.password = await bcrypt.hash(req.body.password, 12)

      await prisma.user.create({ data: req.body })  

      // HTTP 201: Created
      res.status(201).end()
    }
    catch(error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.user.findMany()
    // Retorna o resultado com HTTP 200: OK (implicito)

    // Excluir o campo "password" do resultado
    for(let user of result) {
        if(user.password) delete user.password
    }

    res.send(result)
  }
    catch(error) {
      console.log(error)
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
    
    // Resultado encontrado => HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Resultado não encontrado => HTTP 404: Not Found
  else res.status(404).end()
  }
  catch(error) {
    console.log(error)
    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.update = async function(req, res){
  try {

    // Se tiver sido passado o campo 'password' no body
    // da requisição, precisamos criptografar- la antes de
    // enviar ao banco de dados
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)


    const result = await prisma.user.update({
      where: {id: Number(req.params.id)},
      data: req.body
    })

    // Encontrou e atualizou -> HTP 204: No Content
    if(result) res.status(204).end()
    else res.status(404).end()

  }
  catch(error) {
    console.error(error)
    // HTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.delete = async function(req, res){
  try{
    await prisma.user.delete({
      where: {id: Number(req.params.id)}
    })

    // Encontrou e excluiu -> HTP 204: No Cotent
    res.status(204).end()
    //Não encontrou (e não excluiu) -> vai para o catch

  }
  catch(error) {
    console.error(error)
    // HTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.login = async function(req, res){
  try{
    //Busca o usuario pelo username
    const user = await prisma.user.findUnique({
      where: {username: req.body.username.toLwerCase()}
    })

    //Se o usuario não for encontrado ->
    //HTP 401: Unauthorized
    if(! user) return send(401).end()

    // Usuario encontrado, vamos conferir a senha
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)

    //Se a senha estiver incorreta ->
    //HTP 401: Unauthorized
    if(! passwordMatches) return send(401).end()

    // Se chegamos ate aqui username + password estão ok
    // Vamos criar o token e retorna-lo como resposta

    // O token inclui as informações do usuario. Vamos excluir o campo
    // da senha antes de proseguir
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,

      { expireIn: '24h'} // Prazo de validade do token
    )

    // Retorna o token com status http: 200: ok (implicito)
    res.send({token})

  }
  catch(error) {
    console.error(error)
    // HTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

export default controller