# Backend - Cubos Movies App

Este é o backend do projeto **Cubos Movies App**, uma aplicação para gerenciamento de filmes. Ele foi desenvolvido utilizando Node.js, Express e Prisma, com PostgreSQL como banco de dados.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **Prisma**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **bcryptjs**: Criptografia de senhas.
- **jsonwebtoken**: Geração e validação de tokens JWT.

---

## 📂 Estrutura do Projeto

```plaintext
backend/
├── prisma/               # Configuração do Prisma
│   ├── schema.prisma     # Esquema do banco de dados
├── src/
│   ├── controllers/      # Lógica das rotas
│   ├── routes/           # Definição das rotas
│   ├── prisma/           # Cliente Prisma
│   ├── index.ts          # Arquivo principal do servidor
├── .env                  # Variáveis de ambiente (não versionado)
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts do projeto
```

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone git@github.com:evilyn-cordeiro/cubos-movies-app.git
cd cubos-movies-app/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

Substitua `usuario`, `senha`, `localhost`, `5432` e `nome_do_banco` pelos valores do seu banco de dados PostgreSQL.

### 4. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

## 📖 Rotas da API

### **Autenticação**

#### POST `/auth/register`

- **Descrição**: Registra um novo usuário.
- **Body**:

```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

#### POST `/auth/login`

- **Descrição**: Realiza login e retorna um token JWT.
- **Body**:

```json
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```

---

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npx prisma studio`: Abre o Prisma Studio para gerenciar o banco de dados.
- `npx prisma migrate dev`: Aplica as migrações ao banco de dados.

---
