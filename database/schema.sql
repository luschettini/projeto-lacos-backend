CREATE DATABASE lacos_de_pata;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    type VARCHAR(20) NOT NULL CHECK (type IN ('ong', 'protetor', 'adotante')),
    city VARCHAR(100),
    state VARCHAR(2),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('cachorro', 'gato')),
    breed VARCHAR(100),
    age_category VARCHAR(20) CHECK (age_category IN ('filhote', 'adulto', 'idoso')),
    size VARCHAR(20) CHECK (size IN ('pequeno', 'medio', 'grande')),
    gender VARCHAR(10) CHECK (gender IN ('macho', 'femea')),
    description TEXT,
    medical_history TEXT,
    personality TEXT,
    photos TEXT[],
    is_vaccinated BOOLEAN DEFAULT false,
    is_neutered BOOLEAN DEFAULT false,
    rescue_story TEXT,
    special_needs TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE adoption_interests (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
    adopter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    contact_preference VARCHAR(20) CHECK (contact_preference IN ('email', 'telefone', 'whatsapp')),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    adopter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    animal_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    photo_url VARCHAR(255),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, phone, type, city, state, bio) VALUES
    ('ONG Patinhas Carentes', 'contato@patinhascarentes.org', 'patinhas_ong_carentes', '(11)99999-9999', 'ong', 'São Paulo', 'SP', 'ONG dedicada ao resgate e cuidado de animais abandonados há mais de 10 anos.'),

    ('Instituto Amor Animal', 'contato@amoranimal.org', 'amoranimal_instituto', '(21)88888-8888', 'ong', 'Rio de Janeiro', 'RJ', 'Instituto focado na proteção e bem-estar animal, realizando resgates de emergência.'),

    ('ONG Vidas Peludas', 'info@vidaspeludas.org', 'vidaspeludas_ong', '(31)77777-7777', 'ong', 'Belo Horizonte', 'MG', 'Organização que trabalha com resgates de emergência e reabilitação de animais feridos.'),

    ('Maria Oliveira', 'maria.oliveira@email.com', 'maria_oliveira', '(11)66666-6666', 'protetor', 'São Paulo', 'SP', 'Protetora independente com mais de 15 anos de experiência em resgates.'),

    ('João Pereira Lima', 'joao.pereira@email.com', 'joao_pereira_lima', '(47)55555-5555', 'protetor', 'Joinville', 'SC', 'Protetor especializado em animais idosos e com necessidades especiais.'),

    ('Ana Costa Oliveira', 'ana.costa@email.com', 'ana_c0st4', '(85)44444-4444', 'protetor', 'Fortaleza', 'CE', 'Protetora especializada em felinos, mantém um lar temporário para gatos resgatados.'),

    ('Carlos e família', 'carlos.family@email.com', 'carlos_family', '(11)33333-3333', 'adotante', 'Campinas', 'SP', 'Família com experiência em pets, buscando um novo membro peludo para completar o lar.'),

    ('Fernanda Rodrigues', 'fernanda.rodrigues@email.com', 'fernanda_rodrigues', '(21)22222-2222', 'adotante', 'Niterói', 'RJ', 'Jovem profissional que trabalha home office e tem muito tempo para dedicar a um pet.'),

    ('Roberto e Paula', 'roberto.paula@email.com', 'roberto_paula', '(51)11111-1111', 'adotante', 'Porto Alegre', 'RS', 'Casal aposentado que adora animais e quer proporcionar um lar cheio de amor.');

INSERT INTO animals (name, species, breed, age_category, size, gender, description, medical_history, personality, photos, is_vaccinated, is_neutered, rescue_story, special_needs, user_id) VALUES
    ('Bolt', 'cachorro', 'SRD', 'adulto', 'medio', 'macho', 'Cão muito carinhoso e brincalhão, adora crianças e outros pets.', 'Vacinado, vermifugado e castrado. Exames em dia.', 'Dócil, carinhoso, ativo, obediente', ARRAY['bolt1.jpg', 'bolt2.jpg'], true, true, 'Encontrado abandonado em estrada rural, recuperou-se completamente.', 'Nenhuma necessidade especial', 1),
    ('Luna', 'cachorro', 'Labrador', 'filhote', 'grande', 'femea', 'Filhote alegre e cheia de energia, perfeita para famílias ativas.', 'Vacinas de filhote em dia, aguardando castração.', 'Brincalhona, energética, sociável', ARRAY['luna1.jpg', 'luna2.jpg'], true, false, 'Nasceu no canil após mãe ser resgatada grávida.', 'Precisa de bastante exercício', 2),
    ('Rex', 'cachorro', 'SRD', 'adulto', 'pequeno', 'macho', 'Pequeno mas corajoso, ótimo cão de companhia para apartamentos.', 'Vacinado e castrado, saudável.', 'Corajoso, companheiro, adaptável', ARRAY['rex1.jpg'], true, true, 'Vivia nas ruas do centro da cidade, se adaptou perfeitamente à vida doméstica.', 'Nenhuma necessidade especial', 3),
    ('Thor', 'cachorro', 'Pitbull', 'adulto', 'grande', 'macho', 'Cão protetor e leal, ideal para quem busca um guardião da família.', 'Castrado, vacinado, displasia leve controlada.', 'Protetor, leal, inteligente, calmo', ARRAY['thor1.jpg'], true, true, 'Abandonado por família que se mudou para apartamento pequeno.', 'Displasia leve, exercícios moderados', 4),
    ('Mel', 'cachorro', 'Golden Retriever', 'idoso', 'grande', 'femea', 'Cadela idosa muito doce, perfeita para lares que valorizam pets sênior.', 'Castrada, vacinada, tratamento para artrite.', 'Calma, doce, carinhosa, tranquila', ARRAY['mel1.jpg', 'mel2.jpg'], true, true, 'Entregue quando a família teve dificuldades financeiras para cuidar dela.', 'Artrite, medicação diária, exercícios leves', 5),
    ('Pipoca', 'cachorro', 'Pinscher', 'adulto', 'pequeno', 'femea', 'Pequena e cheia de personalidade, cão pequeno com atitude de grande.', 'Vacinada, castrada, tratamento dentário recente.', 'Esperta, corajosa, territorial', ARRAY['pipoca1.jpg'], true, true, 'Abandonada quando os donos tiveram um bebê e não quiseram mais ela.', 'Socialização gradual com crianças', 1),
    ('Toby', 'cachorro', 'Poodle', 'filhote', 'pequeno', 'macho', 'Filhote de poodle muito inteligente e carinhoso, pelagem cacheada linda.', 'Vacinas de filhote completas, aguardando castração.', 'Inteligente, ativo, carinhoso, brincalhão', ARRAY['toby1.jpg', 'toby2.jpg'], true, false, 'Resgatado quando pet shop fechou durante a pandemia, precisava urgente de novo lar.', 'Escovação regular da pelagem', 2),
    ('Bella', 'cachorro', 'Shih Tzu', 'adulto', 'pequeno', 'femea', 'Cadela dócil e companheira, perfeita para apartamentos e famílias tranquilas.', 'Castrada, vacinada, tratamento dentário em dia.', 'Dócil, tranquila, companheira, amorosa', ARRAY['bella1.jpg'], true, true, 'Resgatada de situação de maus tratos, hoje é uma cadela feliz e confiante.', 'Cuidados com os olhos, escovação diária', 3),
    ('Rusty', 'cachorro', 'SRD', 'adulto', 'medio', 'macho', 'Vira-lata carinhoso e protetor, ótimo para casas com quintal.', 'Vacinado, castrado, cicatriz antiga na pata.', 'Protetor, leal, carinhoso, corajoso', ARRAY['rusty1.jpg'], true, true, 'Vivia há anos como morador de rua, muito sociável com pessoas e outros cães.', 'Nenhuma necessidade especial', 4),
    ('Lola', 'cachorro', 'SRD', 'filhote', 'medio', 'femea', 'Filhote vira-lata cheia de energia, adora brincar e aprender truques.', 'Vacinas de filhote em dia, vermifugada.', 'Energética, inteligente, sociável, brincalhona', ARRAY['lola1.jpg', 'lola2.jpg'], true, false, 'Filha de mãe resgatada grávida, criada com muito amor desde o nascimento.', 'Precisa de socialização e exercícios', 5),
    ('Neguinha', 'cachorro', 'SRD', 'idoso', 'medio', 'femea', 'Cadela idosa muito doce, adora colo e carinho.', 'Castrada, vacinada, tratamento para insuficiência renal.', 'Calma, carinhosa, sensível', ARRAY['neguinha1.jpg'], true, true, 'Foi encontrada em estado crítico em terreno baldio, hoje vive com dignidade.', 'Medicação diária e alimentação especial', 6),
    ('Fred', 'cachorro', 'Beagle', 'adulto', 'medio', 'macho', 'Beagle curioso e esperto, ótimo para famílias com crianças.', 'Vacinado, castrado, saudável.', 'Curioso, brincalhão, sociável', ARRAY['fred1.jpg', 'fred2.jpg'], true, true, 'Foi deixado amarrado na porta de um abrigo durante a madrugada.', 'Precisa de companhia frequente', 1),
    ('Amora', 'cachorro', 'SRD', 'filhote', 'pequeno', 'femea', 'Filhote muito esperta e afetuosa, adora brincar com outros cães.', 'Vacinas em dia, vermifugada.', 'Brincalhona, inteligente, afetuosa', ARRAY['amora1.jpg'], true, false, 'Resgatada com os irmãos em uma caixa de papelão na chuva.', 'Socialização com humanos', 2),
    ('Caju', 'cachorro', 'SRD', 'filhote', 'pequeno', 'macho', 'Irmão da Amora, filhote carinhoso e protetor dos irmãos.', 'Vacinas em dia, vermifugado.', 'Protetor, carinhoso, brincalhão', ARRAY['acai1.jpg'], true, false, 'Resgatado com as irmãs em uma caixa de papelão na chuva.', 'Socialização com humanos', 3),
    ('Jabuticaba', 'cachorro', 'SRD', 'filhote', 'pequeno', 'femea', 'Irmã da Amora, a mais tímida dos irmãos mas muito carinhosa.', 'Vacinas em dia, vermifugada.', 'Tímida, carinhosa, observadora', ARRAY['jabuticaba1.jpg'], true, false, 'Resgatada com os irmãos em uma caixa de papelão na chuva.', 'Paciência para socialização', 4),
    ('Lua', 'cachorro', 'SRD', 'adulto', 'grande', 'femea', 'Cadela forte e protetora, muito leal aos seus cuidadores.', 'Castrada, vacinada, cicatriz antiga no rosto.', 'Protetora, leal, inteligente', ARRAY['lua1.jpg'], true, true, 'Sobreviveu a maus-tratos e foi encontrada em uma construção abandonada.', 'Confiança gradual com estranhos', 5),
    ('Chico', 'cachorro', 'SRD', 'filhote', 'medio', 'macho', 'Filhote alegre e curioso, ama correr e explorar.', 'Vacinas em dia, aguardando castração.', 'Curioso, brincalhão, sociável', ARRAY['chico1.jpg'], true, false, 'Encontrado sozinho em um parque, chorando e procurando comida.', 'Precisa de rotina e segurança', 6),
    ('Mimi', 'gato', 'SRD', 'adulto', 'pequeno', 'femea', 'Gata muito carinhosa e tranquila, adora carinho no colo.', 'Castrada, vacinada, saudável.', 'Carinhosa, tranquila, caseira, dengosa', ARRAY['mimi1.jpg', 'mimi2.jpg'], true, true, 'Abandonada quando os donos se mudaram para outro país.', 'Nenhuma necessidade especial', 6),
    ('Garfield', 'gato', 'Persa', 'adulto', 'medio', 'macho', 'Gato persa majestoso, precisa de escovação regular.', 'Castrado, vacinado, problemas respiratórios controlados.', 'Calmo, majestoso, carinhoso', ARRAY['garfield1.jpg'], true, true, 'Resgatado de casa de acumuladores, recuperou-se totalmente.', 'Escovação diária, cuidados respiratórios', 1),
    ('Nina', 'gato', 'SRD', 'filhote', 'pequeno', 'femea', 'Filhote brincalhona e curiosa, cheia de travessuras típicas.', 'Vacinas de filhote em dia, aguardando castração.', 'Brincalhona, curiosa, ativa, sociável', ARRAY['nina1.jpg', 'nina2.jpg'], true, false, 'Encontrada órfã muito pequena, foi criada na mamadeira.', 'Ambiente seguro para explorar', 2),
    ('Simba', 'gato', 'SRD', 'adulto', 'medio', 'macho', 'Gato independente mas carinhoso, se dá bem com outros gatos.', 'Castrado, vacinado, chip de identificação.', 'Independente, sociável com gatos', ARRAY['simba1.jpg'], true, true, 'Vivia em colônia de rua, já era socializado com outros felinos.', 'Prefere ambiente com outros gatos', 6),
    ('Siam', 'gato', 'Siamês', 'adulto', 'medio', 'macho', 'Gato siamês elegante e vocal, muito inteligente e comunicativo.', 'Castrado, vacinado, saudável e ativo.', 'Vocal, inteligente, ativo, comunicativo', ARRAY['siam1.jpg'], true, true, 'Entregue por família que não conseguia lidar com sua personalidade forte.', 'Precisa de estímulo mental e atenção', 5),
    ('Zara', 'gato', 'SRD', 'filhote', 'pequeno', 'femea', 'Gatinha SRD muito carinhosa, adora brincar com bolinhas.', 'Vacinas de filhote completas, aguardando castração.', 'Carinhosa, brincalhona, curiosa, ativa', ARRAY['zara1.jpg', 'zara2.jpg'], true, false, 'Resgatada de bueiro quando era bebê, cresceu forte e saudável.', 'Ambiente seguro para brincadeiras', 6);

INSERT INTO adoption_interests (animal_id, adopter_id, message, contact_preference, status) VALUES
    (1, 7, 'Nossa família se interessou pelo Bolt. Temos quintal grande e experiência com cães médios.', 'whatsapp', 'aprovado'),
    (2, 8, 'Sou apaixonada por labradores e trabalho home office. Quando posso conhecer a Luna?', 'email', 'pendente'),
    (4, 9, 'Procuramos um cão protetor para nossa chácara. O Thor parece ideal.', 'telefone', 'pendente'),
    (5, 7, 'Também nos interessamos pela Mel. Estamos preparados para os cuidados especiais.', 'whatsapp', 'aprovado'),
    (18, 8, 'Adoro gatos! A Mimi parece ser exatamente o que procuro.', 'email', 'aprovado'),
    (21, 9, 'Já temos um gato em casa e o Simba seria um ótimo companheiro.', 'whatsapp', 'pendente'),
    (12, 7, 'O Fred parece perfeito para nossas crianças, elas adoram beagles!', 'whatsapp', 'pendente'),
    (13, 8, 'Nossa família quer adotar a Amora junto com seus irmãos.', 'email', 'pendente');

INSERT INTO testimonials (adopter_id, animal_name, message, photo_url, is_approved) VALUES
    (7, 'Sasha', 'Sasha foi o melhor presente que nossa família já recebeu! Ela se adaptou super bem à nossa rotina e as crianças são completamente apaixonadas por ela. Uma SRD maravilhosa!', 'depoimento1.jpg', true),

    (8, 'Booble', 'Booble trouxe tanta alegria para minha vida! Como trabalho em casa, ele é minha companhia constante durante o home office. Um gato persa muito carinhoso!', 'depoimento2.jpg', true),

    (9, 'Buddy', 'Buddy é exatamente o guardião que nossa chácara precisava! Protetor, leal e muito carinhoso. Um rottweiler incrível que recomendo para todos!', 'depoimento3.jpg', true),

    (7, 'Princesa', 'Princesa é uma gata muito especial que chegou para completar nossa família. Mesmo sendo mais velha, ela trouxe uma energia incrível para casa!', 'depoimento4.jpg', true),

    (8, 'Cacau', 'Cacau é a companhia perfeita! Um labrador chocolate muito dócil e brincalhão. Adora ficar ao meu lado enquanto trabalho. Adoção mudou minha vida!', 'depoimento5.jpg', true),

    (9, 'Bela', 'Bela é uma poodle incrível! As crianças adoram pentear sua pelagem e brincar com ela no quintal. Muito inteligente e carinhosa!', 'depoimento6.jpg', true),

    (7, 'Mingau', 'Mingau pode ser um gato SRD simples, mas tem uma personalidade gigante! Muito esperto e independente, é a alegria da casa toda!', null, true),

    (8, 'Duque', 'Duque é um pastor alemão muito obediente e protetor. Mesmo sendo grande, é super gentil com as visitas. Cada dia com ele é uma alegria!', 'depoimento8.jpg', false);
