// TODO
// Loguin (BBDD)
// Puntuacion de peliculas (BBDD)
// Descripciones y reseñas
// Lightbox
// REGEX para obtener imagenes de distinto tamaño

const express = require('express');
const app = express();
const index = require('./routes/index')
const peliculas = require('./routes/peliculas');
const axios = require('axios');
const port=process.env.PORT || 3001

app.use(express.static('public'));

app.set('view engine', 'ejs');

//llega el pedido desde index.ejs
app.use('/peliculas', (req, res) => {
  
  //consulta a la api OMDB 2
  let imagenURL = [];
  let titles = [];
  let years = [];
  let altaCalidad = [];

  //api + encodeURIComponent + regexp + promesas + parsin
  axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(req.query.buscar).replace(/%20/g, "+")}&apikey=c61550c1`)
  .then(respuesta => {
    
    arrayDatos = respuesta.data[Object.keys(respuesta.data)[0]];
    for (let i = 0; i < arrayDatos.length; i++) {
      // console.log('titulo: ', arrayDatos[i].Title);
      // console.log('poster: ', arrayDatos[i].Poster);
      altaCalidad.push(String(arrayDatos[i].Poster).replace(/300.jpg$/i, "1200.jpg"))
      titles.push(arrayDatos[i].Title);
      imagenURL.push(arrayDatos[i].Poster);
      years.push(arrayDatos[i].Year);
    }
    
    //corregir b
    // console.log( b[Object.keys(b)[4]] );
    // console.log( b[Object.keys(b)[0]] );

  })
  .then( respo => {
    res.render( 'peliculas', {busqueda: imagenURL, title: titles, year: years, calidad: altaCalidad})
  })
});

app.use('/', index);

//escuchando el puerto
app.listen(port, function () {
  console.log('Ejemplo de app escuchando el puerto 3001.');
});


// let a = "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg";

// a = a.replace(/300.jpg$/i, "2500.jpg");

// console.log(a)