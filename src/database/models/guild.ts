import sequelize from '../sequelize';
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Guild extends Model<InferAttributes<Guild>, InferCreationAttributes<Guild>> {
    declare id: string;
    declare createdAt?: Date;
    declare trackMessages: boolean;
}

Guild.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        trackMessages: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Guild',
        createdAt: true,
        updatedAt: false,
    }
);

Guild.sync();

export default Guild;
