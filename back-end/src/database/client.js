import { PrismaClient } from '@prisma/client'

  /*
    Vulnerabilidade: API2:2023 – Falha de autenticação
    Esta vunerabilidade tambem deveria ser evitada no codigo o log de consultas SQL pode guspir informações sigilosas incluindo dados de autenticacao
    do cliente, é muito impotante evitar o log deddas consultas que contenham informações confidenciais para diminuir o risco de exposicao de informações`
  */


const prisma = new PrismaClient({
  // Exibir todas as consultas SQL geradas no console
  log: [
    {
      emit: 'stdout',
      level: 'query'
    }
  ]
})

export default prisma