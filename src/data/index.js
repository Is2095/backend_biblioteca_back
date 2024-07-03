
import mysql2 from 'mysql2/promise';
import mysql from 'mysql2';
import "dotenv/config";

const { PASSWORD, DATABASE, USER, HOST } = process.env;

const configuracionBD = {
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD
};

export const inicializacionBD = async () => {

    const coneccion = await mysql2.createConnection({
        host: configuracionBD.host,
        user: configuracionBD.user,
        password: configuracionBD.password
    })
    await coneccion.beginTransaction();
    try {
        await coneccion.query(`CREATE DATABASE IF NOT EXISTS ${configuracionBD.database}`)
        await coneccion.query(`USE ${configuracionBD.database}`)

        await coneccion.changeUser({ database: configuracionBD.database })
        await coneccion.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                nombre VARCHAR(45) NOT NULL,
                apellido VARCHAR(45) NOT NULL,
                edad INT NOT NULL,
                email VARCHAR(45) NOT NULL UNIQUE,
                password VARCHAR(45) NOT NULL,
                fechaActual VARCHAR(45) NOT NULL,
                provincia VARCHAR(45) NOT NULL,
                foto VARCHAR(80) NOT NULL DEFAULT 'https://i.postimg.cc/qq4zPr5z/user.png'
            )
        `)
        await coneccion.query(`
            CREATE TABLE IF NOT EXISTS categoria (
                id_categoria INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                categoria VARCHAR(45) NOT NULL
            )
        `)
        await coneccion.query(`
            CREATE TABLE IF NOT EXISTS libros (
                id_libro INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                id VARCHAR(45) NOT NULL,
                authors VARCHAR(50) NOT NULL,
                description TEXT,
                imageLink VARCHAR(250) NOT NULL,
                language VARCHAR(5) NOT NULL,
                pageCount INT NOT NULL,
                title VARCHAR(150) NOT NULL,
                published_date VARCHAR(50) NOT NULL,
                id_categoria INT,
                FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
            )
        `)
        await coneccion.query(`
            CREATE TABLE IF NOT EXISTS favoritos (
                id_favorito INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                id_libro_f INT,
                id_usuario_f INT,
                FOREIGN KEY (id_libro_f) REFERENCES libros(id_libro),
                FOREIGN KEY (id_usuario_f) REFERENCES usuarios(id_usuario)
            )
        `)
        const [rows] = await coneccion.execute(`SELECT categoria FROM ${configuracionBD.database}.categoria `)

        if (rows.length === 0) {
            const categoria = [['fantasy'], ['education'], ['art'], ['romance'], ['techology']]
            coneccion.query('INSERT INTO categoria (categoria) VALUES ?', [categoria]);
        }
        await coneccion.commit()
        console.log('creación de base de datos y/o tablas correctamente');
    } catch (error) {
        console.log('error en la transacción', error);
        await coneccion.rollback()
    }
    finally {
        await coneccion.end()
    }
}

export const coneccionBD = () => {
    const db = mysql.createConnection(configuracionBD);
    db.connect((err) => {
        if (err) {
            console.log('error al conectarse a la base de datos');
            return;
        } else {
            console.log('coneción exitosa a la base de datos: Ani');
        }
    })
    return db;
}
export const desconeccionBD = (db) => {
    db.end((err) => {
        if (err) {
            throw Error('error al desconecatar la base de datos', err)
        } else {
            console.log('Base de datos desconectada');
        }
    });
};


