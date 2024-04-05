import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {} // Objeto vazio

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
        // Retorna o resultado com HTTP 200: OK (implícito)

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
        // Resultado encontrado -> HTTP 200: OK (implícito)

        // Excluir o campo "password" do resultado
        if(result?.password) delete result.password

        if(result) res.send(result)
        // Resultado não encontrado -> HTTP 404: Not found
    else res.status(404).end()
    }
    catch(error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

controller.update = async function(req, res) {
    try {

        // Se tiver sido passsado o campo 'password' no body
        // da requisição, precisamos criptografar a senha
        // antes de enviar para o banco de dados
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }

        const result = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        })
        // Encontrou e atualizou ~> HTTP 204: No content
        if(result) res.status(204).end()

        // Não encontrou ~> HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }
}

controller.delete = async function(req, res) {
    try {
        const result = await prisma.user.delete({
            where: { id: Number(req.params.id) }
        })

        // Encontrou e excluiu ~> HTTP 204: No content
        if(result) res.status(204).end()

        // Não encontrou (e não excluiu) ~> vai para o catch

    }
    catch(error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async function(req, res) {
    try {
        // Buscar o usuário pelo username
        const user = await prisma.user.findUnique({
            where: { username: req.body.username.toLowerCase() }
        })

        // Se o usuário não for encontrado ~> 
        //  HTTP 401: Unauthorized
        if(! user) return res.send(401).end

        // suário encontrado, vamos conferir a senha
        const passwordMatches = await bcrypt.compare(req.body.password, user.password)

        // Se a senha estiver incorreta ~>
        // HTTP 401: Unauthorized
        if(! passwordMatches) return res.status(401).end()

        // Se chegamos até aqui, username + password estão ok
        // Vamos criar o token e retorná-lo como resposta

        // O token inclui as informações do usuário. Vamos excluir
        // o campo "password" antes de incluir no token
        if(user.password) delete user.password 

        const token = jwt.sign(
            user,
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' } // Prazo de validade do token
        )

            // Retornar o token com o status HTTP 200: OK (implícito)
            res.send({ token })
            
    }
    catch(error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).end()
    }

}

export default controller