
import { coneccionBD, desconeccionBD } from '../data/index.js';

const GuardarLibroComoFavoritoBD = async (req, res) => {

    const { id, authors, description, imageLink, language, pageCount, title, publishedDate, categoria, id_usuario } = req.body;

    const db = coneccionBD();
    db.query('SELECT l.id_libro from libros l WHERE l.id = ?', [id], (err, result) => {
        if (err) {
            res.status(404).json({ err: 'error al obtener el id del libro' })
        } else {
            if (result.length !== 0) {
                const idLibro = result[0].id_libro;
                db.query('SELECT * FROM favoritos WHERE id_libro_f = ?', [idLibro], (err, result) => {
                    if (result === undefined) {
                        db.query('INSERT IGNORE INTO favoritos (id_libro_f, id_usuario_f) VALUES (?, ?)', [idLibro, id_usuario], (err, result) => {
                            if (err) {
                                desconeccionBD(db);
                                res.status(404).json({ err: 'error al guardar las datos del libro' })
                                // throw Error('error al guardar las datos del libro');
                            } else {
                                console.log('se ingreso a favorito');
                                desconeccionBD(db);
                                res.status(200).json({ message: 'se ingreso el libro a favorito al usuario' })

                            };
                        });
                    } else {
                        console.log('favorito de usuario existente');
                        res.status(200).json({ message: 'favorito de usuario existente' })
                    }
                })
            } else {
                db.query('SELECT categoria.id_categoria FROM categoria WHERE categoria = ?', [categoria], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        res.status(404).json({ err: 'error al guardar las datos del libro' })
                    } else {
                        db.query('INSERT IGNORE INTO libros (id, authors, description, imageLink, language, pageCount, title, published_date, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', [id, authors, description, imageLink, language, pageCount, title, publishedDate, result[0].id_categoria], (err, result) => {
                            if (err) {
                                desconeccionBD(db);
                                res.status(404).json({ err: 'error al guardar las datos del libro' })
                            } else {
                                console.log('libro guardado');
                                const idLibro = result.insertId;
                                db.query('INSERT IGNORE INTO favoritos (id_libro_f, id_usuario_f) VALUES (?, ?)', [idLibro, id_usuario], (err, result) => {
                                    if (err) {
                                        desconeccionBD(db);
                                        res.status(404).json({ err: 'error al guardar las datos del libro' })
                                    } else {
                                        desconeccionBD(db);
                                        console.log('se ingreso a favorito');
                                        res.status(200).json({message: 'se ingreso el libro a favorito al usuario'})
                                    };
                                });
                            };
                        });
                    };
                });
            };
        };
    });

};

export default GuardarLibroComoFavoritoBD;