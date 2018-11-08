var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/food', ctrlFood.foodGet);
router.get('/food/:id', ctrlFood.getFoodById);
router.post('/food', ctrlFood.foodPost);
router.delete('/food/:id', ctrlFood.foodDelete);
router.put('/food/:id', ctrlFood.foodPut);

module.exports = router;