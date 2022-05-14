const router  = require('express').Router();
const tokenHandler = require ('../handlers/tokenHandler');
const { vaccineController, vaccineLotsController } = require('../controllers')

// 

router.post(
  '/',
  tokenHandler.verifyToken,
  vaccineController.create
);

router.get(
    '/',
    tokenHandler.verifyToken,
    vaccineController.getAll
  );

  
  router.get(
    '/:id',
    tokenHandler.verifyToken,
    vaccineController.getOne
  );

  router.put(
    '/:id',
    tokenHandler.verifyToken,
    vaccineController.update
  );

  router.delete(
    '/:id',
    tokenHandler.verifyToken,
    vaccineController.delete
  );

  //  vaccine Lot routes:

router.post(
  '/lots',
  tokenHandler.verifyToken,
  vaccineLotsController.create
)

router.get(
  '/lots/get-all',
  tokenHandler.verifyToken,
  vaccineLotsController.getAll
)

router.get(
  '/lots/:id',
  tokenHandler.verifyToken,
  vaccineLotsController.getOne
)

router.put(
  '/lots/:id',
  tokenHandler.verifyToken,
  vaccineLotsController.update
)


router.delete(
  '/lots/:id',
  tokenHandler.verifyToken,
  vaccineLotsController.delete
)


module.exports = router;
