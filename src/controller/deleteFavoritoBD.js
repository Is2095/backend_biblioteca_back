
import { coneccionBD, desconeccionBD } from '../data/index.js';

const BorrarFavoritoBD = async (req, res) => {

    const { id, id_usuario } = req.body;

    const db = coneccionBD();

    db.query('SELECT libros.id_libro, favoritos.id_favorito FROM favoritos, libros WHERE libros.id_libro = favoritos.id_libro_f AND libros.id = ?', [id, id_usuario], (err, result) => {
        if (err) {
            res.status(404).json({ err: 'error al buscar datos' })
        } else {
            if (result.length === 0) {
                res.status(404).json({ err: 'no se encontraron datos con la información proporcionada' })
            } else if (result.length === 1) {
                db.query('select libros.id_libro, favoritos.id_favorito from favoritos, libros WHERE libros.id_libro = favoritos.id_libro_f AND libros.id = ? AND id_usuario_f = ?', [id, id_usuario], (err, result) => {
                    if (err) {
                        desconeccionBD(db);
                        res.status(404).json({ err: 'error al conseguir el id del libro favorito' })
                        // throw Error('error al conseguir el id del libro favorito');
                    } else {
                        try {
                            db.beginTransaction();
                            db.query('DELETE FROM favoritos WHERE id_favorito = ?', [result[0].id_favorito]);
                            db.query('DELETE FROM libros WHERE id_libro = ?', [result[0].id_libro]);
                            db.commit();
                            console.log('eliminación de favoritos exitosa');
                            res.status(200).json({ message: 'eliminación de favoritos exitosa' })
                        } catch (error) {
                            db.rollback();
                            res.status(404).json({ err: 'error al eliminar el favorito' })
                        } finally {
                            desconeccionBD(db);
                        }
                    };
                });
            } else {
                const idLibro = result[0].id_libro
                db.query('DELETE FROM favoritos WHERE id_libro_f = ? AND id_usuario_f = ?', [idLibro, id_usuario], (err, result) => {
                    if (result.affectedRows === 0) {
                        res.status(404).json({ err: 'error al encontrar los datos a eliminar' })
                    }
                    if (err) {
                        res.status(404).json({ err: "error al eliminar el favorito" })
                    } else {
                        console.log('se eliminó de favorito');
                        res.status(200).json({ message: 'se eliminó de favorito' })
                    }
                });

            }
        }
    })


};

export default BorrarFavoritoBD;