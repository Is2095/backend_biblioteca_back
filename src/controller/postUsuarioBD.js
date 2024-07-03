
/*import { coneccionBD, desconeccionBD } from "../data/index.js";

const GuardarUsuarioBD = (req, res) => {

    const db = coneccionBD();
    const { nombre, apellido, edad, email, password, fechaActual, provincia } = req.body;
    const dateActual = new Date(fechaActual).toISOString().slice(0, 19).replace('T', ' ');
    const edadNumber = parseInt(edad);

    db.query('SELECT usuarios.id_usuario FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar la información del usuario' })
        } else {
            if (result.length === 0) {
                db.query('INSERT IGNORE INTO usuarios (nombre, apellido, edad, email, fechaActual, provincia) VALUES (?, ?, ?, ?, ?, ?);', [nombre, apellido, edadNumber, email, dateActual, provincia], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        res.status(404).json({ err: 'error al guardar los datos del usuario' })
                        // if (result.warningStatus > 0) {
                        //     db.query('SHOW WARNINGS', (warnErr, warningns) => {
                        //         if (warnErr) {

                        //             console.log(err, 'error');
                        //         } else {
                        //             console.log(warningns);
                        //         }
                        //     })
                        // }
                    } })
                        console.log('usuario registrado')
                        console.log('base de datos desconectada');
                        const idUsuario = result.insertId;
                        desconeccionBD(db);
                        res.redirect('http://localhost:3001/login/index.html')
    
            } 
            else {
                desconeccionBD(db);
                console.log('usuario existente');
                res.status(404).json({ err: 'usuario existente' })
            };
        };
    });
};

export default GuardarUsuarioBD;*/

import { coneccionBD, desconeccionBD } from "../data/index.js";

const GuardarUsuarioBD = (req, res) => {

    const db = coneccionBD();
    const { nombre, apellido, edad, email, password, fechaActual, provincia } = req.body;
    const dateActual = new Date(fechaActual).toISOString().slice(0, 19).replace('T', ' ');
    const edadNumber = parseInt(edad);

    db.query('SELECT usuarios.id_usuario FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar la información del usuario' });
        } else {
            if (result.length === 0) {
                db.query('INSERT IGNORE INTO usuarios (nombre, apellido, edad, email, fechaActual, provincia) VALUES (?, ?, ?, ?, ?, ?);', [nombre, apellido, edadNumber, email, dateActual, provincia], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        res.status(404).json({ err: 'error al guardar los datos del usuario' });
                    } else {
                        console.log('usuario registrado');
                        console.log('base de datos desconectada');
                        const idUsuario = result.insertId;
                        desconeccionBD(db);
                        res.redirect('http://localhost:3001/login/index.html');
                    }
                });
            } else {
                desconeccionBD(db);
                console.log('usuario existente');
                res.status(404).json({ err: 'usuario existente' });
            }
        }
    });
};

export default GuardarUsuarioBD;