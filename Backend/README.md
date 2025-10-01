# 📌 Rangogo Backend

Backend da aplicação **Rangogo**, desenvolvido em **Node.js + Express + Prisma + MySQL**.  
Este documento descreve a **estrutura do projeto**, a função de cada pasta e como consumir a API exposta pelo backend.

---

## 📂 Estrutura de Pastas

```
C:\RANGOGO\Backend\
│── node_modules/          # Dependências instaladas via NPM
│── src/
│   ├── controllers/       # Controladores: regras de negócio (registro, login, etc.)
│   ├── middlewares/       # Middlewares: autenticação, roles, segurança extra
│   ├── prisma/            # Configuração e schema do Prisma (ORM)
│   ├── routes/            # Definição das rotas da API
│   ├── utils/             # Funções utilitárias (ex: geração de tokens JWT)
│   ├── server.js          # Ponto de entrada principal da API (Express)
│   └── prismaClient.js    # Instância centralizada do Prisma Client
│
│── prisma/
│   └── schema.prisma      # Definição do banco de dados (Prisma ORM)
│
│── .env                   # Variáveis de ambiente
│── package.json           # Dependências e scripts NPM
│── README.md              # Documentação
```

---

## 🗂️ Detalhes das Pastas

### 📌 `src/controllers/`
- Contém os **controladores da aplicação**.  
- Aqui ficam as **funções que recebem as requisições e chamam o Prisma**.  
- Exemplo: `authController.js` gerencia registro, login e retorno de tokens.  
⚠️ **Atenção:** Não modificar a lógica de negócio sem alinhamento.

---

### 📌 `src/middlewares/`
- Middlewares que ficam **entre a requisição e a resposta**.  
- Usados para:
  - **Autenticação JWT** (`authMiddleware.js`)
  - **Controle de roles** (`roleMiddleware.js`)
- ⚠️ **Não alterar a lógica**, apenas adicionar novos middlewares se necessário.

---

### 📌 `src/prisma/`
- Contém configurações relacionadas ao Prisma ORM.  
- Exemplo: `prismaClient.js` exporta uma instância única do Prisma para ser usada em todo o projeto.  
- Facilita a conexão com o banco de dados.  

---

### 📌 `src/routes/`
- Define as **rotas do backend**.  
- Cada arquivo organiza endpoints específicos.  
- Exemplo: `authRoutes.js` contém login, registro e rotas protegidas por role.  

---

### 📌 `src/utils/`
- Funções auxiliares que **podem ser reutilizadas** em diferentes partes do projeto.  
- Exemplo: `generateTokens.js` é responsável por criar `accessToken` e `refreshToken` JWT.  

---

### 📌 `prisma/`
- Contém o arquivo **`schema.prisma`**, onde o banco de dados é modelado.  
- A partir daqui são gerados os migrations e o client Prisma.  
⚠️ Alterações aqui afetam diretamente a estrutura do banco.  

---

### 📌 `node_modules/`
- Diretório gerado automaticamente pelo `npm install`.  
- Contém todas as dependências externas.  
⚠️ **Nunca editar nada manualmente aqui.**

---

## 🌐 Acesso à API do Backend

- O backend roda na porta definida no `.env` (padrão **3000**).  
- Exemplo de URL base:
```
http://localhost:3000/
```

- Endpoints expostos ficam no prefixo `/api`.  
Exemplo:
```
http://localhost:3000/api/auth/login
http://localhost:3000/api/auth/register
```

---

## 🔒 Observações Importantes

- **Não alterar a lógica dos controllers e middlewares** sem alinhamento.  
- **Rotas devem ser criadas sempre dentro de `src/routes/`**.  
- **Controllers novos** devem ser adicionados em `src/controllers/`.  
- **Funções auxiliares** devem ir para `src/utils/`.  
- **Nunca salvar segredos no código** → sempre usar `.env`.  
- Alterações no banco **devem passar por migrations do Prisma**.  

---

👉 Esse README serve como **guia de organização**. O time pode adicionar novos módulos e funcionalidades, mas a lógica de autenticação, segurança e conexão com banco deve ser mantida.
