let mysql = require("mysql");

//conentando a la base de datos
let conexion =mysql.createConnection({
    host: "localhost",
    database: "bd_createc",
    user:"root",
    password:""
});
//Comprobando la conexion
conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa");
    }
});

//Insertar nuevos registros a la tabla
/*const nuevoregistro="INSERT INTO users (id,nombre_completo, usuario, password, email, edad) VALUES (NULL,'Rosa', 'Rous','12345','Rous@gmail.com','25')";
conexion.query(nuevoregistro,function(error,registros){
    if(error){
        throw error;
    }else{
        console.log("Datos insertados correctamente")
    }
});*/

//Modificar datos de la tabla
/*const modificar="UPDATE users SET usuario = 'RosaQ' WHERE id=9 ";
conexion.query(modificar,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log("Dato modificado correctamente")
    }
});*/
//Borrar datos de la tabla
const borrar ="DELETE FROM users WHERE id = 9";
conexion.query(borrar,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log("Datos eliminados correctamente")
    }
});
//Consulta y muestreo de la tabla usuarios
/*const usuarios="SELECT * FROM users";
conexion.query(usuarios,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log(lista);
    }
});*/

conexion.end();
