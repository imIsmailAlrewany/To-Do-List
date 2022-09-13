const router = require('express').Router();
const list = require('../controller/list.controller');

router.get('/', list.all);
router.post('/', list.add);
router.get('/del/:id', list.del);
router.get('/edit/:id', list.edit);
router.post('/edit/:id', list.editLogic);
router.get('/search', list.search);

module.exports = router;