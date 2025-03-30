import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Hotkeys from '../models/hotkeys.js';
import sequelize from '../config/database.js';



dotenv.config();

// Registro de usuário
export const registerUser = async (request, reply) => {
  const { username, email, password } = request.body;

  if (!email) return reply.status(400).send({ message: 'O campo email é obrigatório' });

  try {
    const userExists = await User.findOne({ where: { username } });
    if (userExists) return reply.status(400).send({ message: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return reply.status(201).send({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error: error.message });
  }
};

// Login de usuário
export const loginUser = async (request, reply) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return reply.status(400).send({ message: 'Usuário não encontrado' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return reply.status(400).send({ message: 'Senha incorreta' });
    console.log('Chave Secreta:', process.env.SECRET_KEY);

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '30m' });
    console.log('Chave Secreta:', process.env.SECRET_KEY);

    return reply.send({ message: 'Login bem-sucedido', token, username: user.username });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Obter perfil do usuário
export const getProfile = async (request, reply) => {
  const token = request.headers['authorization'];
  if (!token) return reply.status(401).send({ message: 'Token de autenticação não fornecido' });

  try {
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);

    const user = await User.findByPk(decoded.userId);
    if (!user) return reply.status(404).send({ message: 'Usuário não encontrado' });

    return reply.send({ username: user.username, id: user.id });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Logout de usuário
export const logoutUser = async (request, reply) => {
  try {
    return reply.status(200).send({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Gerenciar Hotkeys
export const createManageHotkeys = async (request, reply) => {
  const token = request.headers['authorization'];
  const { hotkey, action, hotkeyId } = request.body;

  if (!token) return reply.status(401).send({ message: 'Token não fornecido' });

  try {
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);

    const user = await User.findByPk(decoded.userId);
    if (!user) return reply.status(404).send({ message: 'Usuário não encontrado' });

    switch (action) {
      case 'create':
        if (!hotkey) return reply.status(400).send({ message: 'Campo hotkey é obrigatório' });

        const newHotkey = await Hotkeys.create({ userId: user.id, hotkey });
        return reply.status(200).send({ message: 'Hotkey criada com sucesso', hotkey: newHotkey });

      case 'update':
        if (!hotkey || !hotkeyId) return reply.status(400).send({ message: 'Campos hotkey e hotkeyId são obrigatórios' });

        const hotkeyToUpdate = await Hotkeys.findOne({ where: { id: hotkeyId, userId: user.id } });
        if (!hotkeyToUpdate) return reply.status(404).send({ message: 'Hotkey não encontrada' });

        hotkeyToUpdate.hotkey = hotkey;
        await hotkeyToUpdate.save();
        return reply.status(200).send({ message: 'Hotkey atualizada com sucesso', hotkey: hotkeyToUpdate });

      case 'delete':
        if (!hotkeyId) return reply.status(400).send({ message: 'Campo hotkeyId é obrigatório' });

        const hotkeyToDelete = await Hotkeys.findOne({ where: { id: hotkeyId, userId: user.id } });
        if (!hotkeyToDelete) return reply.status(404).send({ message: 'Hotkey não encontrada' });

        await hotkeyToDelete.destroy();
        return reply.status(200).send({ message: 'Hotkey deletada com sucesso' });

      default:
        return reply.status(400).send({ message: "Ação inválida! Use 'create', 'update' ou 'delete'" });
    }
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Obter Hotkeys do usuário
export const getHotkeys = async (request, reply) => {
  const token = request.headers['authorization'];

  if (!token) return reply.status(401).send({ message: 'Token não fornecido' });

  try {
    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
    
    

    const user = await User.findByPk(decoded.userId);
    if (!user) return reply.status(404).send({ message: 'Usuário não encontrado' });

    const hotkeys = await Hotkeys.findAll({ where: { userId: user.id } });
    if (!hotkeys || hotkeys.length === 0) return reply.status(404).send({ message: 'Nenhuma hotkey encontrada para este usuário' });

    return reply.send({ hotkeys });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: 'Erro no servidor', error });
  }
};


// obter as hotkeys sem token no home.jsx

export const gethotkeypublic = async (request, reply) => {
  try {
    console.log('Iniciando busca por hotkeys públicas...');
    
    // Verifica se a coluna description existe
    const [results] = await sequelize.query(
      "SHOW COLUMNS FROM Hotkeys LIKE 'description'"
    );
    const hasDescription = results.length > 0;
    
    const attributes = ['id', 'hotkey', 'createdAt'];
    if (hasDescription) {
      attributes.push('description');
    }

    const hotkeys = await Hotkeys.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
      attributes,
      include: [{
        model: User,
        attributes: ['username'],
        required: false
      }]
    });

    console.log(`Encontradas ${hotkeys.length} hotkeys`);
    
    // Formato de resposta padronizado
    return {
      success: true,
      data: hotkeys.map(h => ({
        id: h.id,
        hotkey: h.hotkey,
        description: hasDescription ? h.description : null,
        createdAt: h.createdAt,
        author: h.User?.username || 'Anônimo'
      })),
      timestamp: new Date()
    };

  } catch (error) {
    console.error('Erro no backend:', error);
    return reply.status(500).send({
      success: false,
      message: 'Erro ao carregar hotkeys públicas',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
}