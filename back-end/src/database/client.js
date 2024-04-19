import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    // Exibir todas as consultas SQL gerados no console
    log: [
        {
            emit: 'stdout',
            level: 'query'
        }
    ]
})

export default prisma