import { z } from 'zod'

export default z.object({
  username:
    z.string()
    .max(20, { message: 'O nome de usuário pode ter, no máximo, 20 caracteres' }),

  password:
    z.string()
    .max(200, { message: 'A senha pode ter, no máximo, 200 caracteres' })
})

/**
 * API6:2023 – Acesso irrestrito a fluxos de negócio sensíveis.
 * Essa vulnerabilidade foi evitado usando do Zod para validar explicitamente quais 
 * campos podem ser recebidos e manipulados, prevenindo a atribuição massiva.
 */