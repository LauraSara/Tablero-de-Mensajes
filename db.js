const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('tablero', 'root', 'laurasarabia', {
  host: 'localhost',
  dialect: 'mysql'
});

// acá inicializamos los modelos (tablas)
const Message = sql.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,    
  }
});

const Comment = sql.define('Comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

//User.hasMany(Message);  // User "tiene muchas" Message
//Message.belongsTo(User); // Cada "Message" pertenece a un "User"
Message.hasMany(Comment);
Comment.belongsTo(Message);
//Comment.belongsTo(Message, {foreignKey: "fk_Comment" });
//Comment.belongsTo(User); //cada comentario pertenece a un usuario

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});  

// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  //User,
  Message,
  Comment
};