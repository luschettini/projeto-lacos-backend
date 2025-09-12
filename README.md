# 🐾 Laços de Pata - API Documentation

## 📋 Sobre o Projeto
Backend para aplicação de adoção de animais que conecta ONGs, protetores independentes e adotantes.

### � 5 Páginas do Projeto:
1. **Home** - Apresenta a missão do projeto, pets em destaque
2. **Listagem** - Lista todos os animais disponíveis com filtros
3. **Detalhes** - Exibe informações completas do animal
4. **Sobre Mim** - Perfil do protetor ou ONG
5. **Depoimentos** - Depoimentos de pessoas que adotaram animais

## �🚀 Como Executar
```bash
npm install
npm start
```

## 🌐 Base URL
```
http://localhost:3000/api
```

## 🔐 Dados
A API utiliza JSON para comunicação. Todas as respostas e requisições são em formato JSON.

---

## 📋 Endpoints por Página

### 🏠 Página HOME (`/api/animals`)

#### GET `/api/animals/featured/animals`
Animais em destaque para a home (últimos 6 cadastrados)

#### GET `/api/animals`
Todos os animais disponíveis

---

### 📋 Página LISTAGEM (`/api/animals`)

#### GET `/api/animals`
Listar animais disponíveis com filtros
- Query params: `?species=cachorro&size=medio&age_category=adulto&city=São Paulo&gender=macho`

Exemplo:
```
GET /api/animals?species=cachorro&size=pequeno
```

---

### 📖 Página DETALHES (`/api/animals/:id`)

#### GET `/api/animals/:id`
Obter informações completas de um animal específico

Exemplo:
```
GET /api/animals/1
```

---

### � Página SOBRE MIM (`/api/users`)

#### GET `/api/users/protectors`
Listar todas as ONGs e protetores

#### GET `/api/users/:id`
Obter perfil específico de um protetor/ONG

#### GET `/api/animals/user/:userId`
Listar animais de um protetor/ONG específico

---

### 💬 Página DEPOIMENTOS (`/api/testimonials`)

#### GET `/api/testimonials`
Listar todos os depoimentos aprovados

#### POST `/api/testimonials`
Criar novo depoimento
```json
{
  "adopter_id": 1,
  "animal_name": "Bolt",
  "message": "Bolt trouxe muita alegria para nossa família..."
}
```
**Opcional:** Incluir foto como form-data (campo: `photo`)

---

## � Endpoints Auxiliares

### 👥 Usuários (`/api/users`)

#### GET `/api/users`
Listar usuários
- Query params: `?type=ong` (filtrar por tipo)

#### POST `/api/users`
Cadastrar novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "(11)99999-9999",
  "type": "adotante",
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "bio": "Família que ama animais"
}
```

### 🐕 Animais (`/api/animals`)

#### POST `/api/animals`
Cadastrar animal
```json
{
  "name": "Bolt",
  "species": "cachorro",
  "breed": "SRD",
  "age_category": "adulto",
  "size": "medio",
  "gender": "macho",
  "description": "Cão muito carinhoso",
  "medical_history": "Vacinado",
  "personality": "Dócil e brincalhão",
  "is_vaccinated": true,
  "is_neutered": false,
  "rescue_story": "Resgatado das ruas...",
  "special_needs": "Nenhuma",
  "user_id": 1
}
```

### 💝 Interesse em Adoção (`/api/adoption-interests`)

#### POST `/api/adoption-interests`
Manifestar interesse
```json
{
  "animal_id": 1,
  "adopter_id": 2,
  "message": "Gostaria de adotar este pet...",
  "contact_preference": "whatsapp"
}
```

#### GET `/api/adoption-interests/animal/:animalId`
Listar interesses de um animal específico

---

## 🗃️ Banco de Dados

### Configuração
1. Instale PostgreSQL
2. Crie um banco chamado `lacos_de_pata`
3. Execute o script `database_setup.sql`
4. Configure as variáveis no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lacos_de_pata
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
PORT=3000
```

---

## 🧪 Testando no Postman

### Exemplos por Página:

#### 🏠 HOME - Animais em Destaque:
```
GET http://localhost:3000/api/animals/featured/animals
```

#### 📋 LISTAGEM - Todos os Animais:
```
GET http://localhost:3000/api/animals
```

#### 📋 LISTAGEM - Com Filtros:
```
GET http://localhost:3000/api/animals?species=gato&size=pequeno
```

#### 📖 DETALHES - Animal Específico:
```
GET http://localhost:3000/api/animals/1
```

#### 👤 SOBRE MIM - Lista de Protetores:
```
GET http://localhost:3000/api/users/protectors
```

#### 👤 SOBRE MIM - Protetor Específico:
```
GET http://localhost:3000/api/users/1
```

#### 💬 DEPOIMENTOS:
```
GET http://localhost:3000/api/testimonials
```

---

## � Fluxo das 5 Páginas

### 🔄 Navegação Recomendada:
1. **HOME**: Usar `/api/animals/featured/animals`
2. **LISTAGEM**: Usar `/api/animals` com filtros
3. **DETALHES**: Usar `/api/animals/:id`
4. **SOBRE MIM**: Usar `/api/users/protectors` e `/api/users/:id`
5. **DEPOIMENTOS**: Usar `/api/testimonials`

---

## 🎯 Próximos Passos
1. Configure o banco PostgreSQL
2. Execute `npm start`
3. Teste as rotas correspondentes às 5 páginas
4. Desenvolva o front-end consumindo essas APIs

---

## 🗃️ Banco de Dados

### Configuração
1. Instale PostgreSQL
2. Crie um banco chamado `lacos_de_pata`
3. Execute o script `database_setup.sql`
4. Configure as variáveis no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lacos_de_pata
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
JWT_SECRET=sua_chave_secreta_jwt_muito_segura_aqui
PORT=3000
```

---

## 📁 Upload de Arquivos
- Fotos são salvas na pasta `/uploads`
- Máximo 5MB por arquivo
- Apenas imagens são aceitas
- URLs de acesso: `http://localhost:3000/uploads/nome_do_arquivo`

---

## 🧪 Testando no Postman

### Passo a passo:
1. **Criar usuário:** POST `/api/auth/register`
2. **Fazer login:** POST `/api/auth/login` (copie o token)
3. **Configurar Authorization:** Tipo "Bearer Token", cole o token
4. **Testar endpoints protegidos**

### Dicas:
- Use Collection Variables no Postman para base_url e token
- Para upload de arquivos, use form-data no Body
- Alguns endpoints requerem tipos específicos de usuário

---

## 📱 Tipos de Usuário e Permissões

### 🏢 ONG / 👤 Protetor
- Cadastrar animais
- Gerenciar animais próprios
- Ver interesses de adoção em seus animais
- Aprovar/rejeitar interesses
- Aprovar depoimentos
- Gerar relatórios

### 👨‍👩‍👧‍👦 Adotante
- Ver animais disponíveis
- Manifestar interesse em adoção
- Criar depoimentos
- Gerenciar próprios interesses e depoimentos

---

## 🎯 Próximos Passos
1. Configure o banco de dados PostgreSQL
2. Execute `npm run dev` para iniciar o servidor
3. Importe esta documentação no Postman
4. Comece testando com registro e login de usuários!
