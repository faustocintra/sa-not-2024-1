import prisma from '../database/client.js'
import bcrypt from 'bcrypt'

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
        if(result.password) delete result.password

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

export default controller