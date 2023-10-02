const express = require('express');
const router = express.Router();

const { register, login, logout, deleteUser } = require("../controllers/auth.controller");

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/delete/:id',deleteUser);

module.exports = router;