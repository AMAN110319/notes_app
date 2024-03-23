const express=require("express");
const router= express.Router();
const noteCtrl = require('../controllers/noteCtrl');
const auth=require('../middleware/auth')

router.route('/').get(auth,noteCtrl.getNotes).post(auth,noteCtrl.createNotes);

router.route('/:id').get(auth,noteCtrl.getNote).put(auth,noteCtrl.updateNotes).delete(auth,noteCtrl.deleteNotes);

module.exports=router