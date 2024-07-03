
import { Router } from "express";
import ObtenerLibrosPorCategoriaAPI from '../controller/getLibrosPorCategoriaAPI.js';
import ObtenerLibroPorId from "../controller/getLibroPorIdBD.js";

import BuscarFavoritosBD from "../controller/getFavoritosBD.js";
import GuardarLibroComoFavoritoBD from '../controller/postLibroComoFavoritoBD.js';

import GuardarUsuarioBD from "../controller/postUsuarioBD.js";
import BuscarUsuarioPorEmailBD from "../controller/getUsuarioPorEmailBD.js";

import BorrarFavoritoBD from "../controller/deleteFavoritoBD.js";


const router = Router()

router.get('/libros', ObtenerLibrosPorCategoriaAPI)
router.get('/libros/:id', ObtenerLibroPorId)

router.get('/favoritos/:id_usuario', BuscarFavoritosBD)
router.post('/favoritos', GuardarLibroComoFavoritoBD)
router.delete('/', BorrarFavoritoBD)

router.post('/formulario', GuardarUsuarioBD)
router.post('/usuario', BuscarUsuarioPorEmailBD)

router.put('/', (req, res) => {})

router.get('/prueba', (req, res) => {
    res.send('probando el deploy')
})   

export default router;