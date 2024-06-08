-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,  -- Vulnerabilidade: API2:2023 – Falha de autenticação
    /* Esta vulnerabilidade deveria ser evitada no código implementando um mecanismo de armazenamento seguro de
    senhas, como bcrypt. Adicionalmente, deve-se garantir que tokens de autenticação sejam seguros e corretamente
    gerenciados para evitar sequestros de sessão. */
    "is_admin" BOOLEAN NOT NULL DEFAULT false  -- Vulnerabilidade: API5:2023 – Falha de autenticação a nível de função
    
    /* Esta vulnerabilidade foi evitada ao incluir o campo "is_admin" para diferenciar entre usuários
    administrativos e regulares. No entanto, é necessário garantir que todas as funções administrativas
    verifiquem adequadamente este campo antes de conceder acesso a recursos sensíveis. */
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

/*
Vulnerabilidade: API8:2023 – Má configuração de segurança
Esta vulnerabilidade deveria ser evitada no código garantindo que as configurações de segurança, como permissões
de acesso ao banco de dados e controle de acesso, sejam devidamente configuradas e revisadas regularmente.
Além disso, deve-se evitar configurações padrão que possam ser exploradas.
*/