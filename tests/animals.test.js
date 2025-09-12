const request = require('supertest');

describe('🐾 Testes API Animais - Rotas Reais', () => {
  const baseURL = 'http://localhost:3002';
  let animalCriadoId; // Para armazenar ID do animal criado
  
  // ✅ TESTE 1 - Listar todos os animais (FUNCIONA)
  test('GET /api/animals - deve retornar lista de todos os animais', async () => {
    const response = await request(baseURL)
      .get('/api/animals')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    
    if (response.body.length > 0) {
      const animal = response.body[0];
      expect(animal).toHaveProperty('id');
      expect(animal).toHaveProperty('name');
      expect(animal).toHaveProperty('species');
    }
    
    console.log(`✅ Encontrados ${response.body.length} animais`);
  });

  // ✅ TESTE 2 - Animais em destaque (FUNCIONA)
  test('GET /api/animals/featured - deve retornar animais em destaque', async () => {
    const response = await request(baseURL)
      .get('/api/animals/featured')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    
    console.log(`✅ Encontrados ${response.body.length} animais em destaque`);
  });

  // ✅ TESTE 3 - Animais por usuário (FUNCIONA)
  test('GET /api/animals/user/1 - deve retornar animais de um usuário', async () => {
    const response = await request(baseURL)
      .get('/api/animals/user/1')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    
    console.log(`✅ Encontrados ${response.body.length} animais do usuário 1`);
  });

  // ✅ TESTE 4 - Criar animal (FUNCIONA)
  test('POST /api/animals - deve criar novo animal', async () => {
    const novoAnimal = {
      name: 'Animal Teste',
      species: 'cachorro',
      breed: 'SRD',
      age_category: 'adulto',
      size: 'medio',
      gender: 'macho',
      description: 'Animal criado para teste',
      is_vaccinated: true,
      is_neutered: false,
      user_id: 1
    };

    const response = await request(baseURL)
      .post('/api/animals')
      .send(novoAnimal)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(novoAnimal.name);
    expect(response.body.species).toBe(novoAnimal.species);
    
    // Armazenar ID para usar em outros testes
    animalCriadoId = response.body.id;
    
    console.log(`✅ Animal criado com ID: ${response.body.id}`);
  });

  // ✅ TESTE 5 - Buscar animal específico (usando ID criado)
  test('GET /api/animals/:id - deve retornar animal específico', async () => {
    // Usar o animal que acabamos de criar
    const response = await request(baseURL)
      .get(`/api/animals/${animalCriadoId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', animalCriadoId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('species');
    
    console.log(`✅ Animal encontrado: ${response.body.name}`);
  });

  // ✅ TESTE 6 - Animal inexistente (FUNCIONA)
  test('GET /api/animals/99999 - deve retornar 404 para animal inexistente', async () => {
    const response = await request(baseURL)
      .get('/api/animals/99999')
      .expect(404);

    expect(response.body).toHaveProperty('error');
    console.log('✅ Erro 404 retornado corretamente para animal inexistente');
  });

  // ✅ TESTE 7 - Dados inválidos (FUNCIONA)
  test('POST /api/animals - deve rejeitar dados inválidos', async () => {
    const animalInvalido = {
      name: '', // Nome vazio
      species: 'peixe', // Espécie inválida
      gender: 'indefinido' // Gênero inválido
    };

    const response = await request(baseURL)
      .post('/api/animals')
      .send(animalInvalido)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    console.log('✅ Dados inválidos rejeitados corretamente');
  });

  // ✅ TESTE 8 - Marcar como adotado (CORRIGIDO)
  test('PATCH /api/animals/:id/adopt - deve marcar animal como adotado', async () => {
    const response = await request(baseURL)
      .patch(`/api/animals/${animalCriadoId}/adopt`)
      .expect(200);

    // Baseado na resposta real que você recebeu
    expect(response.body).toHaveProperty('animal');
    expect(response.body).toHaveProperty('message');
    expect(response.body.animal.is_available).toBe(false);
    
    console.log('✅ Animal marcado como adotado');
  });

  // ✅ TESTE - Criar animal SEM user_id (animal de rua)
  test('POST /api/animals - deve criar animal de rua sem user_id', async () => {
    const animalDeRua = {
      name: 'Vira-Lata Teste',
      species: 'cachorro',
      breed: 'SRD',
      age_category: 'adulto',
      size: 'medio',
      gender: 'macho',
      description: 'Animal de rua encontrado'
      // ✅ SEM user_id - animal de rua
    };

    const response = await request(baseURL)
      .post('/api/animals')
      .send(animalDeRua)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(animalDeRua.name);
    expect(response.body.user_id).toBeNull();
    
    console.log(`✅ Animal de rua criado com ID: ${response.body.id}`);
  });

  // ✅ TESTE - Validação de species inválida
  test('POST /api/animals - deve rejeitar species inválida', async () => {
    const animalInvalido = {
      name: 'Teste',
      species: 'peixe', // ❌ Inválido
      age_category: 'adulto',
      size: 'medio',
      gender: 'macho'
    };

    const response = await request(baseURL)
      .post('/api/animals')
      .send(animalInvalido)
      .expect(400);

    expect(response.body.error).toContain('species deve ser');
    console.log('✅ Species inválida rejeitada corretamente');
  });
});