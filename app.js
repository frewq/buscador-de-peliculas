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
  let years = []

  //api + encodeURIComponent + regexp + promesas + parsin
  axios.get(`http://www.omdbapi.com/?s=${encodeURIComponent(req.query.buscar).replace(/%20/g, "+")}&apikey=c61550c1`)
  .then(respuesta => {
    
    arrayDatos = respuesta.data[Object.keys(respuesta.data)[0]];
    for (let i = 0; i < arrayDatos.length; i++) {
      // console.log('titulo: ', arrayDatos[i].Title);
      // console.log('poster: ',npm  arrayDatos[i].Poster);
      titles.push(arrayDatos[i].Title);
      imagenURL.push(arrayDatos[i].Poster);
      years.push(arrayDatos[i].Year);
    }
    
    //corregir b
    // console.log( b[Object.keys(b)[4]] );
    // console.log( b[Object.keys(b)[0]] );

  })
  .then( respo => {
    res.render( 'peliculas', {busqueda: imagenURL, title: titles, year: years})
  })
});

app.use('/', index);

//escuchando el puerto
app.listen(port, function () {
  console.log('Ejemplo de app escuchando el puerto 3001.');
});
