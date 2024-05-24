import { z } from 'zod';

export default z.object({
  fullname:
    z.string()
    .trim()
    .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
    .max(50, { message: 'O nome deve ter, no máximo, 50 carateres' })
    .includes(' ', { message: 'O nome deve ter um espaço em branco separando nome e sobrenome' }),

  username:
    z.string()
    .trim()
    .transform(val => val.toLowerCase())
    .refine(val => val.match(/^[a-z0-9_]{1,20}$/), { message: 'O nome do usuário pode conter apenas letras de a a z, dígitos e sublinhado' })
    .refine(val => val.length <= 20, { message: 'O nome do usuário deve ter, no máximo, 20 caracteres'}),

  password:
    z.string()
    .min(8, { message: 'A senha deve ter, no mínimo, 8 caracteres' }),
    // Obs: possível fazer validações mais complexas com regex
  
  is_admin: 
    z.boolean(),
  
  login_attempts:
    z.number().nonnegative()
    .lte(3, { message: 'O número de tentativas deve ser menor ou igual a 3' }),

  delay_level:
    z.number().nonnegative()
    .lte(6, { message: 'O nível de retardo deve ser menor ou igual a 6' }),

  last_attempt:
    // coerce força a conversão para o tipo date, se o valor recebido for string
    z.coerce.date()
    .optional() // campo opcional
})

.refine(user => {
  // se a senha e a confirmaçao da senha não forem vazias,
  // ambas devem ter o mesmo valor
  user.password && user.password2 && user.password !== user.password2
}, {
  message: 'A confirmação da senha não confere com a senha',
  path: ['password2']
})
.refine(user => {
  !(user.changePassword && user.password.length < 8)
}, {
  message: 'A senha deve ter, pelo menos, 8 caracteres',
  path: ['password']
})