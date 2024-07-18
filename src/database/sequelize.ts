import { Sequelize } from 'sequelize';
import env from '../env';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: env.HOST,
    port: env.PORT,
    username: env.USER,
    password: env.PASSWORD,
    database: env.DATABASE,
    logging: () => {},
});

export default sequelize;
