import { z } from 'zod'

export default z.object({
    username:
        z.string()
        .max(20, { message: 'O nome de usurário pode ter, no máximo, 20 caracteres' }),

    password:
        z.string()
        .max(200, { message: 'A senha pode ter , no máximo, 200 caracteres' })
})