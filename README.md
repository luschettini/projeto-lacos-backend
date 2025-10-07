# 🐾 Laços de Pata - Backend

Conectando ONGs, protetores independentes e adotantes para promover a adoção responsável de animais.

O **Laços de Pata** é uma aplicação web que facilita o processo de adoção de animais, permitindo que ONGs e protetores gerenciem informações de animais disponíveis, enquanto adotantes podem explorar e se conectar com seus futuros companheiros.

---

## 🚀 Funcionalidades
- **🏠 Home**: Página inicial com animais em destaque
- **📋 Listagem**: Lista completa de animais com filtros avançados
- **📖 Detalhes**: Informações completas sobre cada animal
- **👤 Sobre Mim**: Perfis de ONGs e protetores independentes
- **💬 Depoimentos**: Histórias reais de sucesso em adoções
- **📞 Contato**: Canal direto para comunicação com a equipe
- **🔍 Filtros Avançados**: Busca por espécie, porte, idade e localização
- **📤 Upload de Imagens**: Sistema de upload para fotos dos animais

---

## 🛠️ Tecnologias Utilizadas
- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Token)
- **Outras Bibliotecas**:
  - `pg` para integração com PostgreSQL
  - `dotenv` para gerenciamento de variáveis de ambiente
  - `multer` para upload de arquivos
  - `cors` para habilitar requisições entre domínios
  - `nodemon` para desenvolvimento

---

## 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (v22.14.0 ou superior)
- **PostgreSQL** (v13 ou superior)
- **Git** para controle de versão

### Verificar Instalações
```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

---

## 🚀 Instalação e Configuração

### 1. Clone o Repositório
```bash
# Clone o repositório do backend
git clone https://github.com/seu-usuario/projeto-lacos-backend.git

# Entre no diretório do projeto
cd projeto-lacos-backend
```

### 2. Instale as Dependências
```bash
# Instale as dependências do projeto
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lacos_de_pata
DB_USER=postgres
DB_PASSWORD=sua_senha
PORT=3001
```

### 4. Configure o Banco de Dados
```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE lacos_de_pata;

# Saia do PostgreSQL
\q

# Execute o script SQL para criar as tabelas e inserir dados iniciais
psql -U postgres -d lacos_de_pata -f src/database/schema.sql
```

### 5. Inicie o Servidor
```bash
# Inicie o servidor em modo de desenvolvimento
npm start
```

O backend estará rodando em: `http://localhost:3001`

---

## 📂 Estrutura do Projeto
```
projeto-lacos-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do banco PostgreSQL
│   ├── controllers/
│   │   ├── animalController.js  # Lógica dos endpoints de animais
│   │   └── userController.js    # Lógica dos endpoints de usuários
│   ├── database/
│   │   └── schema.sql           # Script SQL com tabelas e dados
│   ├── models/
│   │   ├── animalModel.js       # Modelo de dados dos animais
│   │   └── userModel.js         # Modelo de dados dos usuários
│   ├── routes/
│   │   ├── animals.js           # Rotas dos animais
│   │   ├── users.js             # Rotas dos usuários
│   │   └── testimonials.js      # Rotas dos depoimentos
│   └── uploads/                 # Diretório para upload de imagens
├── .env                         # Variáveis de ambiente
├── package.json                 # Dependências e scripts
├── README.md                    # Documentação do projeto
└── server.js                    # Arquivo principal do servidor
```

---

## 🌐 Exemplos de Uso da API

### 🏠 Página HOME
#### GET `/api/animals/featured/animals`
Retorna os últimos 6 animais cadastrados para exibição na página inicial.

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "name": "Bolt",
    "species": "cachorro",
    "breed": "SRD",
    "age_category": "adulto",
    "size": "medio",
    "gender": "macho",
    "city": "São Paulo",
    "state": "SP",
    "photo_url": "/uploads/srd14.png"
  }
]
```

---

### 📋 Página LISTAGEM
#### GET `/api/animals`
Lista todos os animais disponíveis para adoção com filtros opcionais.

**Query Params:**
- `species`: Filtrar por espécie (`cachorro`, `gato`, `outro`)
- `size`: Filtrar por porte (`pequeno`, `medio`, `grande`)
- `age_category`: Filtrar por faixa etária (`filhote`, `jovem`, `adulto`, `idoso`)
- `city`: Filtrar por cidade
- `state`: Filtrar por estado

**Exemplo de Requisição:**
```
GET /api/animals?species=cachorro&size=medio&city=São Paulo
```

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "name": "Bolt",
    "species": "cachorro",
    "breed": "SRD",
    "age_category": "adulto",
    "size": "medio",
    "gender": "macho",
    "description": "Cão muito carinhoso e brincalhão, adora crianças.",
    "is_vaccinated": true,
    "is_neutered": true,
    "city": "São Paulo",
    "state": "SP",
    "photo_url": "/uploads/srd14.png",
    "created_at": "2025-10-07T12:00:00Z"
  }
]
```

---

### 📖 Página DETALHES
#### GET `/api/animals/:id`
Retorna informações completas de um animal específico.

**Exemplo de Requisição:**
```
GET /api/animals/1
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "name": "Bolt",
  "species": "cachorro",
  "breed": "SRD",
  "age_category": "adulto",
  "size": "medio",
  "gender": "macho",
  "description": "Cão muito carinhoso e brincalhão, adora crianças e outros pets.",
  "medical_history": "Vacinado, vermifugado e castrado. Exames em dia.",
  "personality": "Dócil, carinhoso, ativo, obediente",
  "is_vaccinated": true,
  "is_neutered": true,
  "rescue_story": "Encontrado abandonado em estrada rural, recuperou-se completamente.",
  "special_needs": "Nenhuma necessidade especial",
  "city": "São Paulo",
  "state": "SP",
  "neighborhood": "Vila Madalena",
  "photo_url": "/uploads/srd14.png",
  "user_id": 1,
  "created_at": "2025-10-07T12:00:00Z"
}
```

---

### 👤 Página SOBRE MIM (Usuários)
#### GET `/api/users`
Lista todos os usuários (ONGs e protetores).

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "name": "ONG Patinhas Carentes",
    "email": "contato@patinhascarentes.org",
    "phone": "(11)99999-9999",
    "type": "ong",
    "city": "São Paulo",
    "state": "SP",
    "bio": "ONG dedicada ao resgate e cuidado de animais abandonados há mais de 10 anos.",
    "photo_url": null
  }
]
```

#### GET `/api/users/:id`
Retorna informações de um usuário específico.

---

### 💬 Página DEPOIMENTOS
#### GET `/api/testimonials`
Lista todos os depoimentos aprovados com informações do usuário e animal.

**Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "content": "Adotamos o Bolt através desta plataforma e foi uma experiência incrível!",
    "rating": 5,
    "created_at": "2025-10-07T12:00:00Z",
    "user_id": 7,
    "user_name": "Carlos e família",
    "user_email": "carlos.family@email.com",
    "user_city": "Campinas",
    "user_state": "SP",
    "user_phone": "(11)33333-3333",
    "animal_id": 1,
    "animal_name": "Bolt",
    "animal_species": "cachorro",
    "animal_breed": "SRD",
    "animal_photo": "/uploads/srd14.png"
  }
]
```

#### POST `/api/testimonials`
Cria um novo depoimento.

**Exemplo de Requisição:**
```json
{
  "user_id": 7,
  "animal_id": 1,
  "content": "Experiência maravilhosa de adoção!",
  "rating": 5
}
```

---

### 📞 Página CONTATO
#### POST `/api/contact`
Envia uma mensagem de contato.

**Exemplo de Requisição:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11)99999-9999",
  "message": "Gostaria de saber mais sobre o processo de adoção."
}
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

---

## 📋 Resumo dos Serviços
| Serviço   | URL                     | Porta | Status                     |
|-----------|-------------------------|-------|----------------------------|
| Backend   | http://localhost:3001   | 3001  | ✅ Servidor Principal      |
| Banco     | localhost:5432          | 5432  | ⚠️ PostgreSQL necessário   |

---

## 🧪 Testando a API
Você pode testar os endpoints usando:

### Com cURL
```bash
# Listar animais
curl http://localhost:3001/api/animals

# Buscar animal específico
curl http://localhost:3001/api/animals/1

# Listar depoimentos
curl http://localhost:3001/api/testimonials
```

### Com Postman/Insomnia
- **Base URL**: `http://localhost:3001/api`
- Importe a coleção com os endpoints listados acima

---

## 🗃️ Banco de Dados
O projeto utiliza PostgreSQL com as seguintes tabelas:
- **users**: Usuários (ONGs, protetores, adotantes)
- **animals**: Animais disponíveis para adoção
- **testimonials**: Depoimentos de adotantes

O script `src/database/schema.sql` contém:
- Estrutura completa das tabelas
- Dados iniciais para desenvolvimento
- Relacionamentos entre as entidades

---

## 🎯 Próximos Passos
1. Implementar autenticação JWT completa
2. Adicionar sistema de favoritos
3. Criar endpoint para upload de múltiplas imagens
4. Implementar sistema de notificações
5. Adicionar testes automatizados

---

## 👥 Autor
**Luiza Nicoluci Schettini** - [@luschettini](https://github.com/luschettini)

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!