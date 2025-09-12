# 🐾 Documentação da API - Laços de Pata

**Sistema de Adoção de Animais**

## URL Base
```
http://localhost:3002
```

---

## 📋 Endpoints

### 🐾 Animais

#### **GET** `/api/animals` - Listar todos os animais
- **Descrição:** Retorna lista de todos os animais cadastrados
- **Query Parameters:**
  - `species` - Filtrar por espécie (`cachorro`, `gato`, `outro`)
  - `available` - Filtrar por disponibilidade (`true`, `false`)
  - `size` - Filtrar por tamanho (`pequeno`, `medio`, `grande`)

#### **GET** `/api/animals/featured` - Animais em destaque
- **Descrição:** Retorna animais marcados como destaque para adoção

#### **GET** `/api/animals/:id` - Buscar animal por ID
- **Parâmetros:** `id` (integer) - ID do animal
- **Retorna:** Dados completos do animal ou erro 404

#### **GET** `/api/animals/user/:userId` - Animais de um usuário
- **Parâmetros:** `userId` (integer) - ID do usuário
- **Descrição:** Retorna todos os animais cadastrados por um usuário específico

#### **POST** `/api/animals` - Criar novo animal
- **Body:** Dados do animal (ver modelo abaixo)
- **Retorna:** Animal criado com ID gerado

#### **PUT** `/api/animals/:id` - Atualizar animal
- **Parâmetros:** `id` (integer) - ID do animal
- **Body:** Dados a serem atualizados
- **Retorna:** Animal atualizado

#### **DELETE** `/api/animals/:id` - Remover animal
- **Parâmetros:** `id` (integer) - ID do animal
- **Retorna:** Confirmação da exclusão

---

### 👥 Usuários

#### **GET** `/api/users` - Listar todos os usuários
- **Descrição:** Retorna lista de todos os usuários cadastrados
- **Query Parameters:**
  - `type` - Filtrar por tipo (`ong`, `protetor`, `adotante`)
  - `city` - Filtrar por cidade
  - `state` - Filtrar por estado

#### **GET** `/api/users/protectors` - Listar protetores
- **Descrição:** Retorna apenas usuários do tipo 'protetor'

#### **GET** `/api/users/:id` - Buscar usuário por ID
- **Parâmetros:** `id` (integer) - ID do usuário
- **Retorna:** Dados do usuário (sem senha) ou erro 404

#### **POST** `/api/users` - Criar novo usuário
- **Body:** Dados do usuário (ver modelo abaixo)
- **Retorna:** Usuário criado (sem senha)

#### **PUT** `/api/users/:id` - Atualizar usuário
- **Parâmetros:** `id` (integer) - ID do usuário
- **Body:** Dados a serem atualizados
- **Retorna:** Usuário atualizado

#### **DELETE** `/api/users/:id` - Remover usuário
- **Parâmetros:** `id` (integer) - ID do usuário
- **Retorna:** Confirmação da exclusão

---

## 📊 Modelos de Dados

### Animal
```json
{
  "id": 1,
  "name": "Caramelo",
  "species": "cachorro",
  "breed": "SRD",
  "age_category": "adulto",
  "size": "medio",
  "gender": "macho",
  "description": "Cão muito dócil e carinhoso",
  "medical_history": "Vacinado e vermifugado",
  "personality": "Dócil, brincalhão, ativo",
  "is_vaccinated": true,
  "is_neutered": false,
  "rescue_story": "Encontrado nas ruas do centro",
  "special_needs": "Nenhuma necessidade especial",
  "photo_url": "https://exemplo.com/foto.jpg",
  "is_available": true,
  "user_id": 1,
  "created_at": "2025-09-12T00:00:00.000Z",
  "updated_at": "2025-09-12T00:00:00.000Z"
}
```

### Usuário
```json
{
  "id": 1,
  "name": "ONG Patinhas Carentes",
  "email": "contato@patinhascarentes.org",
  "phone": "(11)99999-9999",
  "type": "ong",
  "address": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "bio": "ONG dedicada ao resgate de animais",
  "photo_url": "https://exemplo.com/logo.jpg",
  "created_at": "2025-09-12T00:00:00.000Z",
  "updated_at": "2025-09-12T00:00:00.000Z"
}
```

---

## ✅ Validações

### Espécie
- `cachorro`
- `gato` 
- `outro`

### Categoria de Idade
- `filhote`
- `jovem`
- `adulto`
- `idoso`

### Tamanho
- `pequeno`
- `medio`
- `grande`

### Gênero
- `macho`
- `femea`

### Tipo de Usuário
- `ong`
- `protetor`
- `adotante`

---

## 🚀 Como usar no Frontend

### Exemplo React

```javascript
const API_BASE = 'http://localhost:3002';

// Buscar todos os animais
const fetchAnimals = async () => {
  const response = await fetch(`${API_BASE}/api/animals`);
  return response.json();
};

// Buscar animais em destaque
const fetchFeaturedAnimals = async () => {
  const response = await fetch(`${API_BASE}/api/animals/featured`);
  return response.json();
};

// Filtrar cachorros disponíveis
const fetchAvailableDogs = async () => {
  const response = await fetch(`${API_BASE}/api/animals?species=cachorro&available=true`);
  return response.json();
};

// Buscar animais de um usuário
const fetchUserAnimals = async (userId) => {
  const response = await fetch(`${API_BASE}/api/animals/user/${userId}`);
  return response.json();
};

// Criar novo animal
const createAnimal = async (animalData) => {
  const response = await fetch(`${API_BASE}/api/animals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animalData)
  });
  return response.json();
};

// Atualizar animal
const updateAnimal = async (animalId, animalData) => {
  const response = await fetch(`${API_BASE}/api/animals/${animalId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animalData)
  });
  return response.json();
};

// Deletar animal
const deleteAnimal = async (animalId) => {
  const response = await fetch(`${API_BASE}/api/animals/${animalId}`, {
    method: 'DELETE'
  });
  return response.json();
};

// Buscar todos os usuários
const fetchUsers = async () => {
  const response = await fetch(`${API_BASE}/api/users`);
  return response.json();
};

// Buscar apenas protetores
const fetchProtectors = async () => {
  const response = await fetch(`${API_BASE}/api/users/protectors`);
  return response.json();
};

// Filtrar ONGs
const fetchONGs = async () => {
  const response = await fetch(`${API_BASE}/api/users?type=ong`);
  return response.json();
};

// Criar novo usuário
const createUser = async (userData) => {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};
```

---

## 📱 Respostas da API

### Sucesso (200/201)
```json
{
  "id": 1,
  "name": "Caramelo",
  // ... dados do objeto
}
```

### Erro (400/404/500)
```json
{
  "error": "Mensagem de erro descritiva"
}
```

---

## 🔍 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Não encontrado
- `500` - Erro interno do servidor

---

## 📝 Exemplos de Uso Completos

### Buscar animais de uma ONG específica
```
GET http://localhost:3002/api/animals/user/1
```

### Filtrar gatos pequenos disponíveis
```
GET http://localhost:3002/api/animals?species=gato&size=pequeno&available=true
```

### Buscar apenas protetores
```
GET http://localhost:3002/api/users/protectors
```

### Buscar ONGs em São Paulo
```
GET http://localhost:3002/api/users?type=ong&city=São Paulo
```
<<<<<<< HEAD

---

## 🧪 Testando a API

Esta API inclui testes automatizados abrangentes usando Jest e Supertest:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Iniciar servidor de desenvolvimento
npm run dev
```

Os testes cobrem:
- ✅ Todas as operações CRUD
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Parâmetros de consulta
- ✅ Casos extremos
=======
>>>>>>> d6a9066901e4a90ca627fd761d7088ae49df4116
