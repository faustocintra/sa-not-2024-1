import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
}

// Chamada da função para obter todos os usuários
getAllUsers()
  .then(users => {
    console.log('Usuários encontrados:', users);
  })
  .catch(error => {
    console.error('Erro:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
