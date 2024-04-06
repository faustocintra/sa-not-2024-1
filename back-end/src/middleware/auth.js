import jwt from "jsonwebtoken";

export default function(req, res, next){

    const bypassRoutes = [
        {url: '/users/login', method: 'POST'}
    ]

    for(let route of bypassRoutes){
        if(route.url === req.url && route.method === req.method){
            next()
            return
        }
    }

    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(403).end()

    const[ , token] = authHeader.split(' ')

    jwt.verify(token, process.env.KEY_TOKEN, (error, user) => {

        if(error) return res.status(403).end()

        req.authUser =  user

        next()

    })

}