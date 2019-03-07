const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  res.render( 'peliculas', {busqueda: req.query.buscar} );
});

module.exports = router;