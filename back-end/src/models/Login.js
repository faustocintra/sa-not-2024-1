import {z} from 'zod'

export default z.object({
    username:
    z.string()
    .max(20, {message: 'O nome de usuario pode ter no maximo 20 catacter'}),

    password:
    z.string()
    .max(20, {message: 'A senha pode ter no maximo 200 catacter'}),
})