import { z } from 'zod'

export default z.object({
    fullname:
        z.string()
            .trim()
            .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
            .max(50, { message: 'O nome deve ter, no maximo, 50 caracteres' })
            .includes(' ', { message: 'O nome deve ter um espaço em branco separando nome e sobrenome' }),

    username:
        z.string()
            .transform(val => val.toLowerCase())
            .refine(val => val.match(/^[a-z0-9_]$/), { message: 'O nome do usuário pode conter apenas letras de a a z, digitos e sublinhado' })
            .refine(val => val.length <= 20, { message: 'O nome do usuário deve term no máximo, 20 caracteres' }),

    password:
        z.string()
            .min(8, { message: 'A senha dever ter, no mínimo, 8 caracteres' }),

    is_admin:
        z.boolean(),

    login_attempts:
        z.number().nonnegative()
            .lte(3, { message: 'O numero de tentativas deve ser menor ou igual a 3' }),

    delay_level:
        z.number().nonnegative()
            .lte(6, { message: 'O nivel de retardo deve ser menor ou igual a 6' }),

    last_attempt:
        z.coerce.date()
            .optional()
}).refine((user) => {
    !(user.changePassword && user.password.length < 8)
}, { message: 'A confirmação da senha não confere com a senha', path: ['password'] })