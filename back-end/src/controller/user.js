import prisma from '../database/client.js'
import bcrypt from 'bcrypt'

const controller = {}

controller.create = async function(req, res){
    try {

        req.body.password = await bcrypt.hash(req.body.password, 12);

        await prisma.user.create({data: req.body})
        res.status(201).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).end()
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
        res.status(500).end()
    }
}

controller.retrieveOne = async function(req, res){
    try {

        const result = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        if(result.password) delete result.password

        if(result) res.status(200).send(result)
        else res.status(404).end()
        
    } catch (error) {
        console.log(error);
        res.status(500).end()
    }
}

export default controller