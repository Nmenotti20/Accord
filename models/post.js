const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');
// Creating our User model
const Post = sequelize.define("post", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Post.associate = function(models) {
    Post.belongsTo(models.Business, {
        foreignKey: 'businessId'
    })
}

Post.sync();

module.exports = Post;