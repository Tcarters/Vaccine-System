var express = require('express');
var router = express.Router();
const tokenHandler = require ('../handlers/tokenHandler');
const { placeController } = require('../controllers')


// place created by user


router.post(
  '/',
  // tokenHandler.verifyToken,
  placeController.create
);

router.get(
    '/',
    // tokenHandler.verifyToken,
    placeController.getAll
  );

  
  router.get(
    '/:id',
    tokenHandler.verifyToken,
    placeController.getOne
  );

  router.put(
    '/:id',
    tokenHandler.verifyToken,
    placeController.update
  );

  router.delete(
    '/:id',
    tokenHandler.verifyToken,
    placeController.delete
  );



module.exports = router;
