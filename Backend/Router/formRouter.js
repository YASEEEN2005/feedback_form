const {createform,getData,deletefeedback} = require('../Controller/formController')

const router = require('express').Router();

router.get('/',getData);
router.post('/',createform);
router.delete('/:id',deletefeedback);

module.exports = router;