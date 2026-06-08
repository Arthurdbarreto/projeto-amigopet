/**
 * @swagger
 * tags:
 *   - name: Tutores
 *     description: Cadastro de tutores
 *   - name: Pets
 *     description: Cadastro de pets
 *   - name: Servicos
 *     description: Cadastro de servicos
 *   - name: Produtos
 *     description: Cadastro de produtos
 *   - name: Agendamentos
 *     description: Agenda de atendimentos
 *
 * components:
 *   schemas:
 *     TutorInput:
 *       type: object
 *       required: [nome, telefone, endereco]
 *       properties:
 *         nome:
 *           type: string
 *           example: Ana Souza
 *         telefone:
 *           type: string
 *           example: "85999990000"
 *         contato:
 *           type: string
 *           example: ana@email.com
 *         endereco:
 *           type: string
 *           example: Rua das Flores, 123
 *     PetInput:
 *       type: object
 *       required: [nome, especie, sexo, tutorId]
 *       properties:
 *         nome:
 *           type: string
 *           example: Mel
 *         especie:
 *           type: string
 *           example: Cachorro
 *         raca:
 *           type: string
 *           example: Shih-tzu
 *         sexo:
 *           type: string
 *           enum: [MACHO, FEMEA]
 *           example: FEMEA
 *         tutorId:
 *           type: string
 *     ServicoInput:
 *       type: object
 *       required: [nome, preco]
 *       properties:
 *         nome:
 *           type: string
 *           example: Banho e tosa
 *         descricao:
 *           type: string
 *           example: Banho completo com tosa higienica
 *         preco:
 *           type: number
 *           example: 80
 *     ProdutoInput:
 *       type: object
 *       required: [nome, preco, estoque]
 *       properties:
 *         nome:
 *           type: string
 *           example: Racao premium
 *         descricao:
 *           type: string
 *           example: Pacote 10kg
 *         preco:
 *           type: number
 *           example: 149.9
 *         estoque:
 *           type: number
 *           example: 20
 *     AgendamentoInput:
 *       type: object
 *       required: [tutorId, petId, servicoId, dataHora]
 *       properties:
 *         tutorId:
 *           type: string
 *         petId:
 *           type: string
 *         servicoId:
 *           type: string
 *         dataHora:
 *           type: string
 *           format: date-time
 *           example: "2026-06-09T14:00:00.000Z"
 *         status:
 *           type: string
 *           enum: [AGENDADO, CONFIRMADO, EM_ATENDIMENTO, CONCLUIDO, CANCELADO, NAO_COMPARECEU]
 *           example: AGENDADO
 *   parameters:
 *     ResourceId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 */

/**
 * @swagger
 * /tutores:
 *   post:
 *     summary: Cria um tutor
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TutorInput'
 *     responses:
 *       201:
 *         description: Tutor criado
 *   get:
 *     summary: Lista tutores
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tutores
 * /tutores/{id}:
 *   get:
 *     summary: Busca tutor por ID
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Tutor encontrado
 *   put:
 *     summary: Atualiza tutor
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TutorInput'
 *     responses:
 *       200:
 *         description: Tutor atualizado
 *   delete:
 *     summary: Remove tutor
 *     tags: [Tutores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Tutor removido
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cria um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       201:
 *         description: Pet criado
 *   get:
 *     summary: Lista pets
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets
 * /pets/{id}:
 *   get:
 *     summary: Busca pet por ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Pet encontrado
 *   put:
 *     summary: Atualiza pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       200:
 *         description: Pet atualizado
 *   delete:
 *     summary: Remove pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Pet removido
 */

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um servico
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoInput'
 *     responses:
 *       201:
 *         description: Servico criado
 *   get:
 *     summary: Lista servicos
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicos
 * /servicos/{id}:
 *   get:
 *     summary: Busca servico por ID
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Servico encontrado
 *   put:
 *     summary: Atualiza servico
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoInput'
 *     responses:
 *       200:
 *         description: Servico atualizado
 *   delete:
 *     summary: Remove servico
 *     tags: [Servicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Servico removido
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado
 *   get:
 *     summary: Lista produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 * /produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Produto encontrado
 *   put:
 *     summary: Atualiza produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *   delete:
 *     summary: Remove produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Produto removido
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendamentoInput'
 *     responses:
 *       201:
 *         description: Agendamento criado
 *   get:
 *     summary: Lista agendamentos
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 * /agendamentos/{id}:
 *   get:
 *     summary: Busca agendamento por ID
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *   put:
 *     summary: Atualiza agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendamentoInput'
 *     responses:
 *       200:
 *         description: Agendamento atualizado
 *   delete:
 *     summary: Remove agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ResourceId'
 *     responses:
 *       200:
 *         description: Agendamento removido
 */
