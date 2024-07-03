
import { coneccionBD, desconeccionBD } from "../data/index.js";

const BuscarUsuarioPorEmailBD = (req, res) => {

    const { email } = req.body;

    const db = coneccionBD();

    db.query('SELECT * FROM usuarios WHERE usuarios.email = ?', [email], (err, result) => {
        if (err) {
            desconeccionBD(db);
            res.status(404).json({ err: 'error al buscar el usuario' })
            // console.log('error al buscar el usuario', err);
        } else {
            desconeccionBD(db);
            if(result.length === 0) {
                res.status(200).json({'err': "no se encontró el usuario"})
            }else {
                res.status(200).json(result[0]);
            }
        }
    });
};

export default BuscarUsuarioPorEmailBD;