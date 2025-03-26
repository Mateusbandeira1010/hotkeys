import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

export default sequelize;
