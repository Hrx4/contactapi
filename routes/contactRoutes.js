const express = require('express')
const router = express.Router();
const {getContact, createContact, getSingleContact, updateContact, deleteConatct} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContact).post(createContact) 
router.route('/:id').get(getSingleContact).put(updateContact).delete(deleteConatct)


module.exports = router