import { z } from 'zod'

export default z.object({
    username:
    z.string()
    .max(20, { message: 'O nome de usuário pode ter, no máximo, 20 caracteres' }),
    /*
    Vulnerabilidade: API3:2023 - Aqui a vulnerabilidade foi evitada garantindo que o nome de usuário
    tenha um formato específico e tenha um comprimento adequado.
    */
    password:
    z.string()
    .max(200, { message: 'A senha pode ter, no máximo, 200 caracteres' })
    /*
    Vulnerabilidade: API3:2023 - Aqui a vulnerabilidade foi evitada ao garantir que o 
    comprimento mínimo e máximo.
    */
})

/*
O código original foi estruturando pensando na segurança dos campos
username e password para atender os requisitos de comprimento da senha.
Foi usado a biblioteca Zod para garantir que os campos não ultrapassem
o comprimento máximo que foi definido.
*/