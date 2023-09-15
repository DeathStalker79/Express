const sequelize = require('./config/database');
const model = require('./models/index');

model.user.hasMany(model.post);
model.post.belongsTo(model.user);

;(async () => {
    await model.user.sync({alter:true});
    await model.post.sync({alter:true});
})();

