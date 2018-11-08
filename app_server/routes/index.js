var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.post('/create', ctrlFood.create_item);
router.post('/create/:id', ctrlFood.putItem);

router.get('/', ctrlFood.getHomeList);
router.get('/food/delete/:id', ctrlFood.foodDelete);
router.get('/create', ctrlFood.createFood);
router.get('/create/:id', ctrlFood.Edit);

module.exports = router;
