# Arquitetura do Projeto Amigo Pet

Este documento descreve a estrutura atual do projeto, o fluxo entre frontend, API e banco de dados, as entidades existentes, as rotas disponiveis, o middleware JWT e os passos para executar a aplicacao localmente.

## Visao geral

O projeto esta dividido em duas aplicacoes principais:

- `front`: aplicacao Angular 16 baseada no template Sakai/PrimeNG.
- `back`: API Node.js com Express, SQLite, JWT, bcrypt e Swagger.

O frontend consome a API em `http://localhost:3000`, conforme configurado em `front/src/environments/environment.ts`. A API usa SQLite como banco local e cria as tabelas automaticamente quando o arquivo `back/db/database.js` e carregado.

## Estrutura de pastas

```text
projeto-amigopet/
|-- back/
|   |-- app.js
|   |-- bin/
|   |   `-- www
|   |-- db/
|   |   |-- database.js
|   |   `-- database.db
|   |-- middleware/
|   |   `-- auth.js
|   |-- models/
|   |   |-- petModel.js
|   |   |-- studentModel.js
|   |   `-- userModel.js
|   |-- routes/
|   |   |-- alunos.js
|   |   |-- auth.js
|   |   |-- index.js
|   |   |-- pets.js
|   |   `-- users.js
|   |-- swagger.js
|   |-- package.json
|   `-- package-lock.json
|-- front/
|   |-- angular.json
|   |-- package.json
|   |-- package-lock.json
|   `-- src/
|       |-- app/
|       |   |-- app-routing.module.ts
|       |   |-- app.module.ts
|       |   |-- layout/
|       |   |-- demo/
|       |   `-- main/
|       |       |-- main-routing.module.ts
|       |       |-- middleware/
|       |       |   |-- auth/
|       |       |   |-- guards/
|       |       |   `-- interceptors/
|       |       `-- pet/
|       |           |-- models/
|       |           |-- services/
|       |           |-- pet.component.ts
|       |           |-- pet.component.html
|       |           |-- pet.module.ts
|       |           `-- pet-routing.module.ts
|       |-- assets/
|       |-- environments/
|       |   |-- environment.ts
|       |   `-- environment.prod.ts
|       |-- index.html
|       `-- main.ts
`-- ARCHITECTURE.md
```

### Backend

- `back/app.js`: configura o Express, CORS, parsers JSON/form, Swagger e registra as rotas principais.
- `back/bin/www`: inicializa o servidor HTTP. A porta padrao e `3000`, ou o valor de `PORT`.
- `back/db/database.js`: conecta ao SQLite e cria as tabelas `users`, `students` e `pets` se elas ainda nao existirem.
- `back/db/database.db`: arquivo fisico do banco SQLite.
- `back/models/`: camada de acesso ao banco.
- `back/routes/`: definicao dos endpoints HTTP.
- `back/middleware/auth.js`: middleware de autenticacao JWT.
- `back/swagger.js`: configuracao do Swagger/OpenAPI.

### Frontend

- `front/src/environments/environment.ts`: define `baseUrl: 'http://localhost:3000'`.
- `front/src/app/app-routing.module.ts`: rotas principais da aplicacao Angular.
- `front/src/app/main/main-routing.module.ts`: rotas da area `main`.
- `front/src/app/main/pet/`: modulo, componente, modelo e servico da tela de pets.
- `front/src/app/main/middleware/auth/`: login, servico de autenticacao e rotas de autenticacao.
- `front/src/app/main/middleware/guards/auth.guard.ts`: protege rotas Angular com base no token salvo.
- `front/src/app/main/middleware/interceptors/`: define um interceptor para adicionar o token nas requisicoes HTTP.
- `front/src/app/layout/` e `front/src/app/demo/`: estrutura visual e componentes herdados do template Sakai/PrimeNG.

## Fluxo Frontend -> API -> Banco

### Login

1. O usuario acessa a tela Angular em `/auth/login`.
2. `LoginComponent` chama `AuthService.login()` com `username` e `password`.
3. `AuthService` envia `POST http://localhost:3000/auth/login`.
4. A rota `back/routes/auth.js` busca o usuario pelo `username`.
5. `userModel.findUserByUsername()` consulta a tabela `users`.
6. A senha enviada e comparada com o hash salvo usando `bcrypt.compare`.
7. Se estiver correta, a API gera um token JWT com `jsonwebtoken`.
8. O frontend salva o token no `localStorage` com a chave `token`.
9. O `AuthGuard` usa `AuthService.isAuthenticated()` para validar se o token existe e nao expirou.

### Pets

1. O usuario acessa a rota Angular `/main/pet`.
2. `PetComponent` chama metodos do `PetService`.
3. `PetService` usa `environment.baseUrl + '/pets'`, ou seja, `http://localhost:3000/pets`.
4. O token e enviado no cabecalho `Authorization: Bearer <token>`.
5. As rotas em `back/routes/pets.js` recebem a requisicao.
6. Nas rotas protegidas, `authenticateToken` valida o JWT antes de continuar.
7. A rota chama funcoes de `back/models/petModel.js`.
8. O model executa SQL diretamente no SQLite via `back/db/database.js`.
9. A API retorna JSON para o Angular.
10. O componente atualiza a tabela/lista exibida na tela.

### Alunos

O fluxo de alunos segue a mesma ideia dos pets:

1. A API recebe chamadas em `/alunos`.
2. As rotas protegidas validam o token JWT.
3. `studentModel.js` executa as consultas SQL na tabela `students`.
4. A resposta e enviada em JSON.

Atualmente, nao foi identificado um modulo Angular especifico para alunos na area `main`; a API de alunos existe no backend.

## Entidades existentes

As entidades sao criadas no arquivo `back/db/database.js`.

### User

Tabela: `users`

Campos:

- `id`: inteiro, chave primaria, autoincremento.
- `username`: texto, unico.
- `password`: texto, hash da senha gerado com bcrypt.

Uso principal:

- Registro de usuarios.
- Login.
- Geracao de token JWT.

### Student / Aluno

Tabela: `students`

Campos:

- `id`: inteiro, chave primaria, autoincremento.
- `name`: texto.
- `gender`: texto.
- `age`: texto.
- `code`: texto.

Uso principal:

- CRUD de alunos pela API `/alunos`.

### Pet

Tabela: `pets`

Campos:

- `id`: inteiro, chave primaria, autoincremento.
- `name`: texto.
- `gender`: texto.
- `id_tutor`: inteiro.
- `color`: texto.
- `breed`: texto.

Modelo TypeScript no frontend: `front/src/app/main/pet/models/pet.ts`

Campos no frontend:

- `id?: string`
- `name?: string`
- `gender?: string`
- `color?: string`
- `breed?: string`
- `idTutor?: number`

Observacao: no banco o campo e `id_tutor`, enquanto no frontend e usado `idTutor`. A rota de criacao de pets recebe `idTutor` do corpo da requisicao e grava em `id_tutor`.

## Rotas existentes

As rotas sao registradas em `back/app.js`.

### Raiz

Base: `/`

| Metodo | Rota | Protegida por JWT | Descricao |
| --- | --- | --- | --- |
| `GET` | `/` | Nao | Retorna `{ title: 'Express' }`. |

### Auth

Base: `/auth`

| Metodo | Rota | Protegida por JWT | Descricao |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Nao | Cria usuario com senha criptografada. |
| `POST` | `/auth/login` | Nao | Valida credenciais e retorna token JWT. |

### Users

Base: `/users`

| Metodo | Rota | Protegida por JWT | Descricao |
| --- | --- | --- | --- |
| `GET` | `/users` | Nao | Rota padrao do scaffold Express; retorna texto simples. |

### Pets

Base: `/pets`

| Metodo | Rota | Protegida por JWT | Descricao |
| --- | --- | --- | --- |
| `GET` | `/pets` | Sim | Lista todos os pets. |
| `GET` | `/pets/:id` | Nao | Busca um pet por ID. |
| `POST` | `/pets` | Sim | Cria um pet. Aceita `name` ou `namePet`. |
| `PUT` | `/pets/:id` | Sim | Atualiza `name`, `gender`, `color` e `breed` de um pet. |
| `DELETE` | `/pets/:id` | Sim | Remove um pet pelo ID. |

### Alunos

Base: `/alunos`

| Metodo | Rota | Protegida por JWT | Descricao |
| --- | --- | --- | --- |
| `GET` | `/alunos` | Sim | Lista todos os alunos. |
| `GET` | `/alunos/:id` | Nao | Busca um aluno por ID. |
| `POST` | `/alunos` | Sim | Cria um aluno. Aceita `name` ou `nameStudent`. |
| `PUT` | `/alunos/:id` | Sim | Atualiza `name`, `gender`, `age` e `code` de um aluno. |
| `DELETE` | `/alunos/:id` | Sim | Remove um aluno pelo ID. |

### Swagger

| Metodo | Rota | Descricao |
| --- | --- | --- |
| `GET` | `/api-docs` | Interface Swagger UI com a documentacao OpenAPI gerada a partir das anotacoes em `back/routes/*.js`. |

## Middleware JWT

O middleware fica em `back/middleware/auth.js` e e exportado como `authenticateToken`.

Funcionamento:

1. Le o cabecalho `Authorization`.
2. Extrai o token no formato `Bearer <token>`.
3. Se o token nao existir, retorna `401` com a mensagem `Token nao fornecido`.
4. Valida o token com `jwt.verify(token, process.env.JWT_SECRET)`.
5. Se o token for invalido, retorna `403` com a mensagem `Token invalido`.
6. Se o token for valido, salva os dados decodificados em `req.user`.
7. Chama `next()` para permitir que a rota continue.

O token e criado no login com o payload:

```js
{
  id: user.id,
  username: user.username
}
```

A expiracao e configurada por `process.env.JWT_EXPIRES_IN`.

### Uso nas rotas

O middleware e aplicado diretamente nas rotas que precisam de autenticacao, por exemplo:

```js
router.get('/', authenticateToken, ...)
router.post('/', authenticateToken, ...)
router.put('/:id', authenticateToken, ...)
router.delete('/:id', authenticateToken, ...)
```

Rotas de busca por ID em `/pets/:id` e `/alunos/:id` existem sem `authenticateToken` no estado atual do codigo.

### Token no frontend

No frontend:

- `AuthService` salva o token em `localStorage` com a chave `token`.
- `AuthGuard` verifica se o token existe e se o `exp` do JWT ainda e valido.
- `AuthInterceptor` adiciona `Authorization: Bearer <token>` nas requisicoes quando ha token no `localStorage`.
- `PetService` tambem cria manualmente um `HttpHeaders` com `Authorization`.

Observacao: o modulo do interceptor existe em `front/src/app/main/middleware/interceptors/auth.module.ts`, mas ele nao aparece importado no `AppModule` ou no modulo de autenticacao principal no estado atual do projeto. Mesmo assim, as chamadas de `PetService` enviam o token manualmente.

## Como executar localmente

### Pre-requisitos

- Node.js instalado.
- npm instalado.
- Dependencias instaladas separadamente em `back` e `front`.

### Configurar o backend

Entre na pasta do backend:

```bash
cd back
```

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` em `back/` com as variaveis usadas pela autenticacao:

```env
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1h
PORT=3000
```

Inicie a API:

```bash
npm start
```

Ou, em modo de desenvolvimento com `nodemon`:

```bash
npm run dev
```

A API ficara disponivel em:

```text
http://localhost:3000
```

A documentacao Swagger ficara disponivel em:

```text
http://localhost:3000/api-docs
```

### Configurar o frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd front
```

Instale as dependencias:

```bash
npm install
```

Inicie o Angular:

```bash
npm start
```

O Angular normalmente ficara disponivel em:

```text
http://localhost:4200
```

### Ordem recomendada

1. Subir o backend em `http://localhost:3000`.
2. Subir o frontend em `http://localhost:4200`.
3. Criar um usuario via `POST /auth/register` ou Swagger.
4. Fazer login pela tela `/auth/login`.
5. Acessar a area autenticada e usar a tela de pets em `/main/pet`.

## Observacoes importantes

- O banco SQLite e local e fica em `back/db/database.db`.
- As tabelas sao criadas automaticamente por `back/db/database.js`.
- A API usa `cors()`, permitindo chamadas do frontend local.
- A API espera que `JWT_SECRET` e `JWT_EXPIRES_IN` estejam configurados no ambiente.
- Algumas mensagens no codigo estao com caracteres acentuados quebrados, por exemplo `UsuÃ¡rio`, provavelmente por diferenca de encoding.
- Em `auth.js`, a rota `/auth/register` chama `findUserByUsername`, mas nao interrompe explicitamente o fluxo antes de chamar `createUser`; se o usuario ja existir, o banco deve bloquear por causa do `UNIQUE`, mas a logica pode ser ajustada futuramente para evitar duas respostas na mesma requisicao.
- Em `userModel.createUser`, o callback de `db.run` usa arrow function, entao `this?.lastID` provavelmente nao trara o ID inserido do SQLite. Para acessar `lastID`, seria necessario usar `function (err) { ... }`.
