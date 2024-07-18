import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../sequelize';
import Guild from './guild';

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare id: string;
    declare userId: string;
    declare guildId: string;
    declare channelId: string;
    declare textLength: number;
    declare bot: boolean;
    declare createdAt?: Date;
}

Message.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        textLength: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Message',
        createdAt: true,
        updatedAt: false,
    }
);

Guild.hasMany(Message, { foreignKey: 'guildId', sourceKey: 'id' });
Message.belongsTo(Guild, { foreignKey: 'guildId', targetKey: 'id' });

Message.sync();

export default Message;
