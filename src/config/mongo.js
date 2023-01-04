// Requerimos mongoose
const mongoose = require('mongoose');
// Función para setear la info de MongoDB
const connectToDB = () => {
// Quitamos los warnings
mongoose.set("strictQuery",true);
// Conectamos a la base de datos
const mongoConnection = "mongodb://127.0.0.1:27017/TPFinalBACodingSchool";
mongoose.connect(
    mongoConnection,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    function (err,res) {
        if(err) {
            console.log("Error al conectar a la base de datos " + err);
    } 
    else{
        console.log("Conexión a la base de datos exitosa!" );
    }
    });
};

    module.exports = connectToDB;