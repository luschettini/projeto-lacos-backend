const request = require('supertest');

describe('👥 Testes API Usuários', () => {
  const baseURL = 'http://localhost:3002';
  
  // ✅ TESTE 1 - Listar usuários
  test('GET /api/users - deve retornar lista de usuários', async () => {
    const response = await request(baseURL)
      .get('/api/users')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    
    if (response.body.length > 0) {
      const user = response.body[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('type');
    }
    
    console.log(`✅ Encontrados ${response.body.length} usuários`);
  });

  // ✅ TESTE 2 - Usuário específico
  test('GET /api/users/1 - deve retornar usuário específico', async () => {
    const response = await request(baseURL)
      .get('/api/users/1')
      .expect(200);

    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    
    console.log(`✅ Usuário encontrado: ${response.body.name}`);
  });

  // ✅ TESTE 3 - Filtrar por tipo
  test('GET /api/users?type=ong - deve filtrar ONGs', async () => {
    const response = await request(baseURL)
      .get('/api/users?type=ong')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    
    if (response.body.length > 0) {
      response.body.forEach(user => {
        expect(user.type).toBe('ong');
      });
    }
    
    console.log(`✅ Encontradas ${response.body.length} ONGs`);
  });
});