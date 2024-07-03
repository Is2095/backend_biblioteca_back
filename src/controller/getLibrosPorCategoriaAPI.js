
import 'dotenv/config';

const APIKEY = process.env.APIKEY;

const ObtenerLibrosPorCategoriaAPI = (req, res) => {

    const {categoria, nombreLibro }= req.query;
    let url = ''
    if(nombreLibro) {
        url = `https://www.googleapis.com/books/v1/volumes?q=${nombreLibro}`;
    } else {
        url = `https://www.googleapis.com/books/v1/volumes?q=subject:${categoria}&maxResults=5&langRestrict=es&key=${APIKEY}`
    }
    fetch(url)
        .then(result => result.json())
        .then(libros => libros.items)
        .then(librosCategoria => {
            const datosLibros = [];
            librosCategoria?.forEach(items => {
                if (items.volumeInfo.authors && items.volumeInfo.publishedDate) {
                    datosLibros.push({
                        id: items.id,
                        authors: items.volumeInfo.authors[0],
                        description: items.volumeInfo.description,
                        imageLink: items.volumeInfo?.imageLinks?.thumbnail,
                        language: items.volumeInfo.language,
                        pageCount: items.volumeInfo.pageCount,
                        title: items.volumeInfo.title,
                        publishedDate: items.volumeInfo.publishedDate,
                        categoria: categoria
                    });
                };
            });
            res.status(200).json(datosLibros);
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({err: "error al buscar los datos a la API"})
        });
};

export default ObtenerLibrosPorCategoriaAPI;