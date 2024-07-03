# Poyecto Grupal CodoACodo "BIBLIOTECA VIRTUAL"

## Descripción
descripción del proyecto...

## Instalación

### Requisitos Tecnológicos:

- Node.js >= 20.x
- npm >= 10.x

### Clonar el Repositorio

''' En consola (bash) 

- git clone https://github.com/

## Instalar dependencias

En la raiz del proyecto: /backend_biblioteca

- npm install

## Configuración del entorno

Crear un archivo en la raíz del proyecto .env en el cual se deberá colocar las siguientes variables: 

- PORT = 3001
- PASSWORD = 'colocar la contraseña de la base de datos mySQL'
- APIKEY = 'apikey de la API de GOOGLE BOOKS'

## Modo Desarrollo

- npm run dev

## Estructura del Proyecto

 backend_biblioteca
    ├── public
    │   ├── actualizarUsuario
    │   │   ├── index.html
    │   │   └── styles.css
    │   ├── formulario
    │   │   ├── js
    │   │   │    └── script.js
    │   │   ├── CONTACTO.html
    │   │   ├── package.json
    │   │   └── styles.css
    │   ├── imagenes
    │   │   └── logo.jpg
    │   ├── js
    │   │   ├── favoritos.js
    │   │   └── index.js
    │   ├── login
    │   │   ├── index.html
                login.css
    │   │   └── login.js
    │   ├── index.html
    │   └── styles.css
    ├── src
    │   ├── controllers
    │   │   ├── deleteFavoritoBD.js
    │   │   ├── getFavoritosBD.js
    │   │   ├── getLibroPorIdBD.js
    │   │   ├── getLibrosPorCategoriaAPI.js
    │   │   ├── getUsuarioPorEmailBD.js
    │   │   ├── PostLibroComoFavoritoBD.js
    │   │   └── postUsuarioBD.js
    │   ├── data
    │   │   └── index.js
    │   ├── routes
    │   │   └── index.js
    ├── app.js
    ├── package.json
    └── README.md
  ## Rutas de la API

`GET /api/libros`
Obtiene los libros de la API "google books", por categoría

- Datos por query.
- Respuesta: [] en caso de no encontrar los datos requeridos.
- Respuesta: [{"id", "authors", "description", "imageLink", "language", "pageCount", "title", "publishedDate", "categoria"}, {"id", "authors", "description", "imageLink", "language", "pageCount", "title", "publishedDate", "categoria"}, ...].
- Respuesta error: {"err": "mensaje error correspondiente}.


`GET /api/libros/:id`
Obtener un libro con un id específico "/:id".

- Dato por params.
- Respuesta: [] en caso de no encontrar elementos.
- Respuesta: [{"id_libro", "authors", "description", "imageLink", "language", "pageCount", "title", "published_date", "id_categoria", "id"}].
- Respuesta error: {"err": "mensaje error correspondiente}.

`GET /api/favoritos/:id_usuario`
Obtener los id de los libros favoritos que tiene un usuario específico "/:id_usuario".

- Dato por params.
- Respuesta: [] en caso de no encontrar elementos.
- Respuesta: [{"id": "valor"}, {"id": "valor"}].
- Respuesta error: {"err": "mensaje error 
correspondiente"}.

`POST /api/favoritos`
Guarda los datos del libro y usuario, relacionando libro(favorito)-usuario.

- Datos por "body": {id, authors, description, imageLink, language, pageCount, title, publishedDate, id_usuario, categoria}.
- Respuesta: {"message": "se ingreso el libro a favorito al usuario"}.
- Respuesta error: {"err": "mensaje error correspondiente}.

`DELETE /api/`
Borra el libro favoritos de tabla de libro y tabla secundaria favoritos, asociado al usuario específico.

- Datos por "body": {id, id_usuario}.
- Respuesta: {"message": "eliminación de favoritos exitosa"}.
- Respuesta error: libro incorrecto, usuario incorrecto, eliminación fallida: {"err": "mensaje de error correspondiente"}.

`POST /api/formulario`
Guarda los datos del usuario registrado.

- Datos por "body": {nombre, apellido, edad, email, fechaActual, provincia}.
- Respuesta: se redirecciona a "/login/index.html".
- Respuesta error: {"err": "mensaje de error correspondiente"}.

`POST /api/usuario`
Buscar un usuario por un email específico.

- Dato por body: {email}.
- Respuesta: {"id_usuario: _, "nombre": "_", "apellido": "_", "edad": _, "email": "_", "fechaActual": "_", "provincia": "_", "foto": "_"}.
- Respuesta error: {"err": "mensaje de error correspondiente"}.

`PUT /api/`



# Base de Datos - MySQL con Workbench

## Estructura de tablas

## tabla "libros"

- id_libro INT PK AUTO_INCREMENT NotNull
- authors VARCHAR(50) NotNull
- description TEXT
- ImageLink VARCHAR(250) NotNull
- language VARCHAR(5) NotNull
- pageCount INT NotNull
- title VARCHAR(50) NotNull
- published_date VARCHAR(50) NotNull
- id_categoría INT FK (de tabla categoria)
- id VARCHAR(45) NotNull

## tabla "usuarios"

- id_usuario INT PK AUTO_INCREMENT NotNull
- nombre VARCHAR(45) NotNull
- apellido VARCHAR(45) NotNull
- edad INT NotNull
- email VARCHAR(45) NotNull Unique
- password VARCHAR(25) NotNull
- fechaActual DATE NotNull
- provincia VARCHAR(45) NotNull
- foto VARCHAR(45) NotNull

## tabla "categoria"

- id_categoria INT PK AUTO_INCREMENT NotNull
- categoria VARCHAR(45) NotNull

## tabla "favoritos"

- id_favorito INT PK AUTO_INCREMENT NotNull
- id_libro_f INT FK (de tabla libros)
- id_usuario_f INT FK (de tabla usuarios)