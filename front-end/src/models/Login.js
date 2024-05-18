import { z } from 'zod'

export default z.object({
    username:
        z.string()
        .max(20, { message: 'O nome não pode ter mais de 20 caracteres'}),
    password:
        z.string()
        .max(200, { message: 'A senha pode ter, no maximo 200 caracteres' })
})