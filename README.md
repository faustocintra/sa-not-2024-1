# Projeto back-end

## Comando de criação do projeto
npx @aka-demy/create-express-app

# Configurar .env 
* DATABASE_URL="file:./database/local.db"
* TOKEN_SECRET="SECRETINHO"
* FRONT_END_SERVER="http://localhost:5173, http://127.0.0.1:5173/"
* MAX_LOGIN_ATTEMPTS=3
* DELAY_LEVELS="30,90,270,810,2430,7290"

Perguntas que o comando faz:
* Ok to proceed? y
* Give a name for the app: back-end
* Choose a language: JavaScript
* Choose a template engine: None
* Choose a package manager: npm

## Comandos para execução do projeto
cd back-end
npm run dev

## Comandos de instalação e configuração do Prisma
npm install prisma --save-dev
npx prisma init

## Comando para executar uma migration
npx prisma migrate dev --name nome-da-migration

## Comando para exibir/editar os dados do BD
npx prisma studio

## Dependencias
npm install date-fns
npm i express-limit
npm i nodemon
npm install helmet
npm install zod

# Projeto front-end

## Comando para criação do projeto
npm create vite@latest

Perguntas feitas pelo comando:
* OK to proceed? y
* Project name: front-end
* Select a framework: React
* Select a variant: JavaScript

# Instalação de dependências e inicialização do projeto
cd front-end
npm install
npm i zod
npm run dev

# Instalação da biblioteca de roteamento
npm install react-router-dom