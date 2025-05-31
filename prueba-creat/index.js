const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const router=express.Router();
//const db = require('../config/db'); // Configuración de tu base de datos MySQL

const app = express();

let conexion = mysql.createConnection({
    host: "localhost",
    database: "bd_createc",
    user: "root",
    password: ""
});

// Conectar a la base de datos
/*conexion.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL.");
});*/

app.use(express.static('public'));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false
}));

// Página de registro
app.get("/registro", function(req, res) {
    res.render("registro");  // Cambia la ruta a /register
});

// Página de inicio de sesión
app.get("/login", function(req, res) {
    res.render("login");
});

// Registro de usuario
app.post("/validar", function(req, res) {
    const datos = req.body;
    let nombre = datos.nombres;
    let user = datos.usuario;
    let contra = datos.password;
    let correo = datos.email;
    let fecha = datos.birthdate;

    let registrar = "INSERT INTO users (nombre_completo, usuario, password, email, fecha_nacimiento) VALUES ('" + nombre + "','" + user + "','" + contra + "','" + correo + "','" + fecha + "')";
    conexion.query(registrar, function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Datos almacenados correctamente");
            res.redirect("/login");
        }
    });
});

// Validar inicio de sesión
app.post("/valuser", function(req, res) {
    const { usuario, password } = req.body;

    // Consulta para obtener los datos del usuario, incluida la columna 'role'
    let consulta = "SELECT * FROM users WHERE usuario = ? AND password = ?";
    conexion.query(consulta, [usuario, password], function(error, results) {
        if (error) {
            throw error;
        }
        
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.usuario = usuario;
            req.session.role = results[0].role; // Guardamos el rol del usuario en la sesión
            
            // Redirigir según el rol del usuario
            if (results[0].role === 'admin') {
                res.redirect("/admin");
            } else {
                res.redirect("/createc");
            }
        } else {
            res.send("Usuario o contraseña incorrectos.");
        }
    });
});
app.get("/admin", function (req, res) {
    if (req.session.loggedin && req.session.role === "admin") {
        let consultaUsuarios =
            "SELECT id, nombre_completo, usuario, email, DATE_FORMAT(fecha_nacimiento, '%Y/%m/%d') AS fecha_nacimiento FROM users WHERE role = 'user'";
        let consultaConteoUsuarios =
            "SELECT COUNT(*) AS totalEstudiantes FROM users WHERE role = 'user'";
        let consultaCursos =
            "SELECT id, nombre, descripcion, DATE_FORMAT(fecha_inicio, '%Y/%m/%d') AS fecha_inicio, DATE_FORMAT(fecha_cierre, '%Y/%m/%d') AS fecha_cierre, profesor FROM cursos";
        let consultaConteoCursos = "SELECT COUNT(*) AS totalCursos FROM cursos";

        conexion.query(consultaUsuarios, function (error, resultsUsuarios) {
            if (error) {
                console.error("Error al obtener usuarios:", error);
                return res.status(500).send("Error al obtener usuarios.");
            }

            conexion.query(consultaConteoUsuarios, function (error, resultsConteoUsuarios) {
                if (error) {
                    console.error("Error al contar usuarios:", error);
                    return res.status(500).send("Error al contar usuarios.");
                }

                conexion.query(consultaCursos, function (error, resultsCursos) {
                    if (error) {
                        console.error("Error al obtener cursos:", error);
                        return res.status(500).send("Error al obtener cursos.");
                    }

                    conexion.query(consultaConteoCursos, function (error, resultsConteoCursos) {
                        if (error) {
                            console.error("Error al contar cursos:", error);
                            return res.status(500).send("Error al contar cursos.");
                        }

                        const totalEstudiantes = resultsConteoUsuarios[0].totalEstudiantes;
                        const totalCursos = resultsConteoCursos[0].totalCursos;

                        res.render("admin", {
                            usuario: req.session.usuario,
                            estudiantes: resultsUsuarios,
                            totalEstudiantes,
                            cursos: resultsCursos,
                            totalCursos,
                        });
                    });
                });
            });
        });
    } else {
        res.send("Acceso denegado: no tienes permisos de administrador.");
    }
});


// Ruta para agregar un nuevo curso
router.post('/admin/agregar-curso', async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_cierre, profesor } = req.body;

    const query = `
        INSERT INTO cursos (nombre, descripcion, fecha_inicio, fecha_cierre, profesor)
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        await db.query(query, [nombre, descripcion, fecha_inicio, fecha_cierre, profesor]);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error al agregar curso:', error);
        res.status(500).send('Error al agregar el curso');
    }
});

module.exports = conexion;


// Página protegida
app.get("/createc", function(req, res) {
    if (req.session.loggedin) { //Verificamos si el usuario ha iniciado sesión
        res.set("Cache-Control", "no-store"); // Agrega este encabezado
        let consulta = "SELECT nombre_completo, usuario, email, fecha_nacimiento FROM users WHERE usuario = ?";
        
        // Consulta la información del usuario, excepto la contraseña
        conexion.query(consulta, [req.session.usuario], function(error, results) {
            if (error) {
                throw error;
            }

            if (results.length > 0) {
                // Envía los datos del usuario a la vista "createc"
                res.render("createc", { 
                    usuario: req.session.usuario, 
                    datosUsuario: results[0] // Los datos del usuario están en results[0]
                });
            } else {
                res.send("Error: Usuario no encontrado.");
            }
        });
    } else {
        res.send("Por favor, inicia sesión para ver esta página.");
    }
});

//Pagina de ver cursos
app.get("/curso", function(req, res) {
    res.render("curso");  // Asegúrate de que la vista 'curso' existe
});

app.get("/curso-web", function(req, res) {
    res.render("curso-web");  // Asegúrate de que la vista 'curso' existe
});
app.get("/curso-programacion", function(req, res) {
    res.render("curso-programacion");  // Asegúrate de que la vista 'curso' existe
});
app.get("/curso-robotica", function(req, res) {
    res.render("curso-robotica");  // Asegúrate de que la vista 'curso' existe
});

//Endpoint de Pagina de videos
app.get("/video", function(req,res){
    res.render("video");
});

//Pagina de pago
app.get("/pagos", function(req,res){
    res.render("pagos");
});
app.get("/check-session", (req, res) => {
    if (req.session.loggedin) {
        res.sendStatus(200); // La sesión es válida
    } else {
        res.sendStatus(401); // La sesión no es válida
    }
});
// Cerrar sesión
app.get("/logout", (req, res) => {
    // Destruir la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            // Enviar mensaje de error o redirigir a una página de error específica
            return res.status(500).send("Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.");
        } 
        // Redirigir al usuario a la página de inicio de sesión
        res.clearCookie("connect.sid"); // Elimina la cookie de sesión en el navegador
        res.redirect("/");
    });
});

// Iniciar servidor
app.listen(3000, function() {
    console.log("El servidor está en http://localhost:3000");
}); 