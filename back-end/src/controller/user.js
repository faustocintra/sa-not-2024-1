import prisma from '../database/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {}

controller.create = async function(req, res){
    try {

        req.body.password = await bcrypt.hash(req.body.password, 12);

        await prisma.user.create({data: req.body})
        res.status(201).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function(req, res){
    try {

        const result = await prisma.user.findMany()

        for(let user of result){
            if(user.password) delete user.password
        }
        res.status(200).send(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function(req, res){
    try {

        const result = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        if(result?.password) delete result.password

        if(result) res.status(200).send(result)
        else res.status(404).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

controller.update = async function (req, res){

    try {
        
        if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

        const result = await prisma.user.update({
            where: {id: Number(req.params.id)},
            data: req.body
        })

        if(result) res.status(204).end()
        else res.status(404).end()

    } catch (error) {
        
        console.error(error);
        res.status(500).send(error)

    }

}

controller.delete = async function(req, res){

    try {

        await prisma.user.delete({
            where : {id : Number(req.params.id)}
        })

        res.status(204).end()
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send(error)

    }

}

controller.login = async function(req, res){
    
    try {

        const user = await prisma.user.findUnique({
            where: { username: req.body.username.toLowerCase()}
        })

        if(!user) return res.status(401).end()

        const passwordMatches = await bcrypt.compare(req.body.password, user.password)

        if(!passwordMatches) return res.status(401).end()

        const token = jwt.sign(user, process.env.KEY_TOKEN, {expiresIn: '24h'})

        res.send({token})

    } catch (error) {
        
        console.error(error);
        res.status(500).send(error)

    }

}

export default controller