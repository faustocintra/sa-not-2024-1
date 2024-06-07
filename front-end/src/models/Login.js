import { z } from 'zod'

export default z.object({
  /*
  Vulnerabilidade: API4:2023 - Consumo irrestrito de recursos
  Define o tamanho máximo do nome de usuário e da senha, evitando que usuários maliciosos sobrecarreguem o sistema.
  */
  username:
    z.string()
    .max(20, { message: 'O nome de usuário pode ter, no máximo, 20 caracteres' }),

  password:
    z.string()
    .max(200, { message: 'A senha pode ter, no máximo, 200 caracteres' })
})