const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  res.render( 'index', {titulo: 'Buscador de películas'} );
});

module.exports = router;