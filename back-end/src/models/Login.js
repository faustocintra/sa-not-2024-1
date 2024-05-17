import { Z } from 'zod'

export default Z.object({
    username:
        Z.string()
        .max(20, { message: 'O nome de usuário pode ter, no máximo, 20 caracteres' }),

    password:
        Z.string()
        .max(200, { message: 'A senha pode ter, no máximo, 200 caracteres' })
})