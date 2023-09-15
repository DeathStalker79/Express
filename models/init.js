const sequelize = require('../config/database');

const User = require('./User');
const Post = require('./Post');

User.hasMany(Post);
Post.belongsTo(User);
// Post.hasMany(User);
// User.belongsTo(Post);

// User.belongsToMany(Post, {through: 'UserPost'});
// Post.belongsToMany(User, {through: 'UserPost'});

const init = async () => {
    // await sequelize.sync({alter: true});
    await User.sync({alter: true});
    await Post.sync({alter: true});
}

module.exports = { init, User, Post };