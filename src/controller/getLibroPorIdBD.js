
import { coneccionBD, desconeccionBD }from "../data/index.js";

const ObtenerLibroPorId = (req, res) => {
    const {id} = req.params
    const db = coneccionBD();
    db.query('SELECT * FROM LIBROS WHERE id_libro = ?', [parseInt(id)], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: "error al conseguir el dato del libro" })
        } else {
            desconeccionBD(db);
            res.status(200).send(result);
        };
    });
};
export default ObtenerLibroPorId;