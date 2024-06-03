const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const allowedTags = ['web', 'java', 'javascript', 'github', 'dsa', 'oops'];

const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [allowedTags], // Ensure the tag is one of the predefined tags
    },
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Question;
