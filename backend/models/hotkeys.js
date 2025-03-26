import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; 

const Hotkeys = sequelize.define('Hotkeys', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  hotkey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.hasMany(Hotkeys, { foreignKey: 'userId', onDelete: 'CASCADE' });
Hotkeys.belongsTo(User, { foreignKey: 'userId' });

export default Hotkeys;
