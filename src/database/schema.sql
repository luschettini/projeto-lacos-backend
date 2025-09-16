CREATE DATABASE lacos_de_pata;

\c lacos_de_pata;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    type VARCHAR(20) NOT NULL CHECK (type IN ('ong', 'protetor', 'adotante')),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    bio TEXT,
    photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('cachorro', 'gato', 'outro')),
    breed VARCHAR(100) DEFAULT 'SRD',
    age_category VARCHAR(50) NOT NULL CHECK (age_category IN ('filhote', 'jovem', 'adulto', 'idoso')),
    size VARCHAR(50) NOT NULL CHECK (size IN ('pequeno', 'medio', 'grande')),
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('macho', 'femea')),
    description TEXT,
    medical_history TEXT,
    personality TEXT,
    is_vaccinated BOOLEAN DEFAULT false,
    is_neutered BOOLEAN DEFAULT false,
    rescue_story TEXT,
    special_needs TEXT,
    photo_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Limpar dados existentes antes de inserir novos (opcional)
TRUNCATE TABLE testimonials, animals, users RESTART IDENTITY CASCADE;

INSERT INTO users (name, email, password, phone, type, city, state, bio) VALUES
('ONG Patinhas Carentes', 'contato@patinhascarentes.org', 'patinhas_ong_carentes', '(11)99999-9999', 'ong', 'São Paulo', 'SP', 'ONG dedicada ao resgate e cuidado de animais abandonados há mais de 10 anos.'),

('Instituto Amor Animal', 'contato@amoranimal.org', 'amoranimal_instituto', '(21)88888-8888', 'ong', 'Rio de Janeiro', 'RJ', 'Instituto focado na proteção e bem-estar animal, realizando resgates de emergência.'),

('ONG Vidas Peludas', 'info@vidaspeludas.org', 'vidaspeludas_ong', '(31)77777-7777', 'ong', 'Belo Horizonte', 'MG', 'Organização que trabalha com resgates de emergência e reabilitação de animais feridos.'),

('Maria Oliveira', 'maria.oliveira@email.com', 'maria_oliveira', '(11)66666-6666', 'protetor', 'São Paulo', 'SP', 'Protetora independente com mais de 15 anos de experiência em resgates.'),

('João Pereira Lima', 'joao.pereira@email.com', 'joao_pereira_lima', '(47)55555-5555', 'protetor', 'Joinville', 'SC', 'Protetor especializado em animais idosos e com necessidades especiais.'),

('Ana Costa Oliveira', 'ana.costa@email.com', 'ana_c0st4', '(85)44444-4444', 'protetor', 'Fortaleza', 'CE', 'Protetora especializada em felinos, mantém um lar temporário para gatos resgatados.'),

('Carlos e família', 'carlos.family@email.com', 'carlos_family', '(11)33333-3333', 'adotante', 'Campinas', 'SP', 'Família com experiência em pets, buscando um novo membro peludo para completar o lar.'),

('Fernanda Rodrigues', 'fernanda.rodrigues@email.com', 'fernanda_rodrigues', '(21)22222-2222', 'adotante', 'Niterói', 'RJ', 'Jovem profissional que trabalha home office e tem muito tempo para dedicar a um pet.'),

('Roberto e Paula', 'roberto.paula@email.com', 'roberto_paula', '(51)11111-1111', 'adotante', 'Porto Alegre', 'RS', 'Casal aposentado que adora animais e quer proporcionar um lar cheio de amor.'),

('Abrigo São Francisco', 'contato@abrigosaofrancisco.org', 'saofrancisco_abrigo', '(62)99876-5432', 'ong', 'Goiânia', 'GO', 'Abrigo municipal que atende mais de 300 animais em situação de vulnerabilidade, com foco em reabilitação.'),

('Dr. Pedro Veterinário', 'pedro.vet@email.com', 'pedro_veterinario', '(41)98765-4321', 'protetor', 'Curitiba', 'PR', 'Veterinário que dedica seu tempo livre para resgatar e tratar animais feridos encontrados nas ruas.'),

('Lúcia Protetora Animal', 'lucia.protetora@email.com', 'lucia_protetora', '(84)97654-3210', 'protetor', 'Natal', 'RN', 'Protetora que mantém um santuário para animais idosos e deficientes físicos que não conseguem ser adotados.'),

('Família Santos Silva', 'familia.santossilva@email.com', 'santos_silva_fam', '(71)96543-2109', 'adotante', 'Salvador', 'BA', 'Família jovem com quintal grande, procura cães de médio a grande porte para adoção responsável.'),

('Isabela Amante de Gatos', 'isabela.gatos@email.com', 'isabela_cat_lover', '(65)95432-1098', 'adotante', 'Cuiabá', 'MT', 'Apaixonada por felinos, vive em apartamento amplo e procura gatos adultos para proporcionar vida tranquila.');


-- ANIMAIS SEM RESPONSÁVEL (SEM user_id)
INSERT INTO animals (name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs) VALUES
('Caramelo', 'cachorro', 'SRD', 'adulto', 'medio', 'macho', 'Cão amarelo muito dócil encontrado vagando pelas ruas do centro.', 'Aparenta estar saudável, mas precisa de exames veterinários.', 'Dócil, carinhoso, um pouco tímido', false, false, 'Vive nas ruas há meses, conhecido pelos comerciantes locais.', 'Precisa de cuidados veterinários urgentes'),

('Pretinha', 'cachorro', 'SRD', 'idoso', 'pequeno', 'femea', 'Cadela idosa de rua, muito carinhosa apesar das dificuldades.', 'Visível desnutrição, possíveis problemas articulares.', 'Carinhosa, grata, resiliente', false, false, 'Abandonada na praça central, sobrevive da bondade das pessoas.', 'Cuidados geriátricos urgentes'),

('Frajola', 'gato', 'SRD', 'jovem', 'medio', 'macho', 'Gato preto e branco muito esperto, consegue se virar sozinho.', 'Aparenta boa saúde, mas não foi examinado.', 'Independente, esperto, observador', false, false, 'Vive em colônia de gatos no bairro industrial.', 'Castração necessária'),

('Mel de Rua', 'cachorro', 'SRD', 'jovem', 'grande', 'femea', 'Cadela grande e dócil que apareceu na porta de uma escola.', 'Sem histórico médico, precisa de avaliação.', 'Dócil, protetora de crianças, gentil', false, false, 'Apareceu na escola e se tornou mascote não oficial.', 'Precisa de lar definitivo'),

('Branquinho', 'gato', 'SRD', 'adulto', 'pequeno', 'macho', 'Gato branco encontrado ferido em construção abandonada.', 'Ferimento na pata, em processo de cicatrização.', 'Desconfiado, mas carinhoso quando ganha confiança', false, false, 'Encontrado machucado, aparenta ter sido abandonado.', 'Medicação para ferimento'),

('Peluda', 'cachorro', 'SRD', 'adulto', 'medio', 'femea', 'Cadela de pelagem longa, muito maternal com outros animais.', 'Sinais de ter amamentado recentemente, sem filhotes encontrados.', 'Maternal, protetora, carinhosa', false, false, 'Encontrada sozinha, aparenta ter perdido os filhotes.', 'Avaliação reprodutiva necessária'),

('Rajado', 'gato', 'SRD', 'filhote', 'pequeno', 'macho', 'Filhote de gato rajado, muito brincalhão e esperto.', 'Aparenta boa saúde, precisa de vacinas de filhote.', 'Brincalhão, curioso, ativo', false, false, 'Encontrado órfão em caixa de papelão no mercado.', 'Vacinas de filhote urgentes'),

('Grandão', 'cachorro', 'SRD', 'adulto', 'grande', 'macho', 'Cão de grande porte, muito dócil apesar do tamanho.', 'Subnutrido, precisa ganhar peso.', 'Gentil, calmo, grato', false, false, 'Abandonado em estrada, caminhoneiros davam comida.', 'Alimentação reforçada'),

('Pequenina', 'cachorro', 'SRD', 'idoso', 'pequeno', 'femea', 'Cadela pequenininha, aparenta ser muito idosa.', 'Problemas dentários, possível catarata.', 'Tranquila, carinhosa, dependente', false, false, 'Encontrada vagando em bairro residencial.', 'Cuidados geriátricos especiais'),

('Malhado', 'gato', 'SRD', 'jovem', 'medio', 'macho', 'Gato malhado muito sociável, se aproxima de pessoas.', 'Aparenta boa saúde geral.', 'Sociável, confiante, carinhoso', false, false, 'Frequenta restaurantes da região em busca de comida.', 'Necessita castração'),

('Dourada', 'cachorro', 'SRD', 'jovem', 'medio', 'femea', 'Cadela de pelagem dourada, muito ativa e inteligente.', 'Boa condição física, aparenta ter vivido em casa.', 'Ativa, inteligente, obediente', false, false, 'Apareceu no bairro há duas semanas, ninguém reclama.', 'Investigar se tem dono'),

('Tigrado', 'gato', 'SRD', 'adulto', 'pequeno', 'macho', 'Gato tigrado muito independente, mas aceita carinho.', 'Cicatriz antiga na orelha, aparenta boa saúde.', 'Independente, territorialista, carinhoso', false, false, 'Vive no território próximo ao cemitério.', 'Monitoramento de saúde'),

('Café', 'cachorro', 'SRD', 'filhote', 'pequeno', 'macho', 'Filhote marrom como café, muito dócil e carinhoso.', 'Aparenta boa saúde, precisa de vacinas.', 'Dócil, carinhoso, dependente', false, false, 'Encontrado chorando em frente a padaria.', 'Vacinas e vermifugação urgentes'),

('Listrada', 'gato', 'SRD', 'jovem', 'pequeno', 'femea', 'Gata com listras distintas, muito esperta e ágil.', 'Boa condição física, aparenta estar grávida.', 'Esperta, ágil, cautelosa', false, false, 'Apareceu grávida procurando local seguro para parir.', 'Cuidados pré-natal'),

('Corajoso', 'cachorro', 'SRD', 'adulto', 'grande', 'macho', 'Cão que protege outros animais menores na rua.', 'Cicatrizes de brigas, mas saudável.', 'Protetor, corajoso, leal', false, false, 'Líder de matilha de rua, protege os menores.', 'Socialização com humanos'),

('Manhosa', 'gato', 'SRD', 'adulto', 'pequeno', 'femea', 'Gata muito carinhosa, sempre pedindo cafuné.', 'Aparenta boa saúde, bem socializada.', 'Carinhosa, manhosa, sociável', false, false, 'Apareceu no bairro pedindo carinho aos moradores.', 'Investigar origem'),

('Aventureiro', 'cachorro', 'SRD', 'jovem', 'medio', 'macho', 'Cão jovem muito explorador, sempre em movimento.', 'Boa condição física, muito ativo.', 'Aventureiro, curioso, energético', false, false, 'Visto explorando diferentes bairros da cidade.', 'Precisa de ambiente seguro');

-- ANIMAIS COM RESPONSÁVEL (COM user_id) 
INSERT INTO animals (name, species, breed, age_category, size, gender, description, medical_history, personality, is_vaccinated, is_neutered, rescue_story, special_needs, user_id) VALUES
('Bolt', 'cachorro', 'SRD', 'adulto', 'medio', 'macho', 'Cão muito carinhoso e brincalhão, adora crianças e outros pets.', 'Vacinado, vermifugado e castrado. Exames em dia.', 'Dócil, carinhoso, ativo, obediente', true, true, 'Encontrado abandonado em estrada rural, recuperou-se completamente.', 'Nenhuma necessidade especial', 1),

('Luna', 'cachorro', 'Labrador', 'filhote', 'grande', 'femea', 'Filhote alegre e cheia de energia, perfeita para famílias ativas.', 'Vacinas de filhote em dia, aguardando castração.', 'Brincalhona, energética, sociável', true, false, 'Nasceu no canil após mãe ser resgatada grávida.', 'Precisa de bastante exercício', 2),

('Rex', 'cachorro', 'SRD', 'adulto', 'pequeno', 'macho', 'Pequeno mas corajoso, ótimo cão de companhia para apartamentos.', 'Vacinado e castrado, saudável.', 'Corajoso, companheiro, adaptável', true, true, 'Vivia nas ruas do centro da cidade, se adaptou perfeitamente à vida doméstica.', 'Nenhuma necessidade especial', 3),

('Thor', 'cachorro', 'Pitbull', 'adulto', 'grande', 'macho', 'Cão protetor e leal, ideal para quem busca um guardião da família.', 'Castrado, vacinado, displasia leve controlada.', 'Protetor, leal, inteligente, calmo', true, true, 'Abandonado por família que se mudou para apartamento pequeno.', 'Displasia leve, exercícios moderados', 4),

('Mel', 'cachorro', 'Golden Retriever', 'idoso', 'grande', 'femea', 'Cadela idosa muito doce, perfeita para lares que valorizam pets sênior.', 'Castrada, vacinada, tratamento para artrite.', 'Calma, doce, carinhosa, tranquila', true, true, 'Entregue quando a família teve dificuldades financeiras para cuidar dela.', 'Artrite, medicação diária, exercícios leves', 5),

('Pipoca', 'cachorro', 'Pinscher', 'adulto', 'pequeno', 'femea', 'Pequena e cheia de personalidade, cão pequeno com atitude de grande.', 'Vacinada, castrada, tratamento dentário recente.', 'Esperta, corajosa, territorial', true, true, 'Abandonada quando os donos tiveram um bebê e não quiseram mais ela.', 'Socialização gradual com crianças', 1),

('Toby', 'cachorro', 'Poodle', 'filhote', 'pequeno', 'macho', 'Filhote de poodle muito inteligente e carinhoso, pelagem cacheada linda.', 'Vacinas de filhote completas, aguardando castração.', 'Inteligente, ativo, carinhoso, brincalhão', true, false, 'Resgatado quando pet shop fechou durante a pandemia, precisava urgente de novo lar.', 'Escovação regular da pelagem', 2),

('Bella', 'cachorro', 'Shih Tzu', 'adulto', 'pequeno', 'femea', 'Cadela dócil e companheira, perfeita para apartamentos e famílias tranquilas.', 'Castrada, vacinada, tratamento dentário em dia.', 'Dócil, tranquila, companheira, amorosa', true, true, 'Resgatada de situação de maus tratos, hoje é uma cadela feliz e confiante.', 'Cuidados com os olhos, escovação diária', 3),

('Mimi', 'gato', 'SRD', 'adulto', 'pequeno', 'femea', 'Gata muito carinhosa e tranquila, adora carinho no colo.', 'Castrada, vacinada, saudável.', 'Carinhosa, tranquila, caseira, dengosa', true, true, 'Abandonada quando os donos se mudaram para outro país.', 'Nenhuma necessidade especial', 6),

('Garfield', 'gato', 'Persa', 'adulto', 'medio', 'macho', 'Gato persa majestoso, precisa de escovação regular.', 'Castrado, vacinado, problemas respiratórios controlados.', 'Calmo, majestoso, carinhoso', true, true, 'Resgatado de casa de acumuladores, recuperou-se totalmente.', 'Escovação diária, cuidados respiratórios', 1),

('Nina', 'gato', 'SRD', 'filhote', 'pequeno', 'femea', 'Filhote brincalhona e curiosa, cheia de travessuras típicas.', 'Vacinas de filhote em dia, aguardando castração.', 'Brincalhona, curiosa, ativa, sociável', true, false, 'Encontrada órfã muito pequena, foi criada na mamadeira.', 'Ambiente seguro para explorar', 2),

('Simba', 'gato', 'SRD', 'adulto', 'medio', 'macho', 'Gato independente mas carinhoso, se dá bem com outros gatos.', 'Castrado, vacinado, chip de identificação.', 'Independente, sociável com gatos', true, true, 'Vivia em colônia de rua, já era socializado com outros felinos.', 'Prefere ambiente com outros gatos', 6),

('Siam', 'gato', 'Siamês', 'adulto', 'medio', 'macho', 'Gato siamês elegante e vocal, muito inteligente e comunicativo.', 'Castrado, vacinado, saudável e ativo.', 'Vocal, inteligente, ativo, comunicativo', true, true, 'Entregue por família que não conseguia lidar com sua personalidade forte.', 'Precisa de estímulo mental e atenção', 5),

('Zara', 'gato', 'SRD', 'filhote', 'pequeno', 'femea', 'Gatinha SRD muito carinhosa, adora brincar com bolinhas.', 'Vacinas de filhote completas, aguardando castração.', 'Carinhosa, brincalhona, curiosa, ativa', true, false, 'Resgatada de bueiro quando era bebê, cresceu forte e saudável.', 'Ambiente seguro para brincadeiras', 6),

('Max', 'cachorro', 'Pastor Alemão', 'adulto', 'grande', 'macho', 'Pastor alemão muito obediente e protetor, ideal para famílias com experiência.', 'Vacinado, castrado, displasia controlada com fisioterapia.', 'Protetor, obediente, leal, inteligente', true, true, 'Foi entregue por família que se mudou para apartamento e não tinha espaço.', 'Exercícios regulares, fisioterapia para displasia', 10),

('Nala', 'gato', 'SRD', 'filhote', 'medio', 'femea', 'Filhote SRD extremamente docil, parece uma boneca de pelucia.', 'Vacinas de filhote completas, aguardando castracao.', 'Docil, tranquila, carinhosa, companheira', true, false, 'Nasceu de uma femea resgatada gravida de um canil clandestino.', 'Ambiente interno, escovacao regular, socializacao suave', 14);


INSERT INTO testimonials (user_id, animal_id, content, rating, is_approved) VALUES
(7, 1, 'Adotamos o Bolt atraves desta plataforma e foi uma experiencia incrivel! Ele se adaptou perfeitamente a nossa familia e adora brincar com nossos filhos. O processo foi muito transparente e bem organizado. Recomendamos demais!', 5, true),
(8, 2, 'A Luna transformou minha vida! Como trabalho home office, ela e minha companhia constante. E uma cadela muito carinhosa e brincalhona. O suporte da equipe durante todo o processo foi excepcional. Muito obrigada!', 5, true),
(9, 5, 'Decidimos adotar um pet senior e a Mel foi perfeita para nossa casa. Ela e muito tranquila e carinhosa. Mesmo com suas necessidades especiais, o amor que ela nos da e infinito. Valeu muito a pena!', 5, true),
(13, 4, 'O Thor e um cao incrivel! Muito protetor e carinhoso com toda a familia. Mesmo sendo um pitbull, ele e super docil com as criancas. A plataforma nos ajudou a encontrar exatamente o que procuravamos.', 5, true),
(14, 9, 'A Mimi e perfeita! Muito carinhosa e se adaptou super bem ao apartamento. Adora ficar no meu colo enquanto trabalho. O processo de adocao foi simples e bem explicado. Estou muito feliz!', 5, true),
(7, 3, 'Tambem adotamos o Rex recentemente e ele se deu super bem com o Bolt! Mesmo sendo pequeno, ele tem uma personalidade incrivel. Nossa familia esta completa agora com nossos dois companheiros!', 5, true),
(9, 8, 'A Bella e nossa segunda adocao e estamos apaixonados! Ela e muito docil e se deu muito bem com a Mel. E incrivel ver como dois animais resgatados podem trazer tanta alegria para nossa casa.', 5, true);

