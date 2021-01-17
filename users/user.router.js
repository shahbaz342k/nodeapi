const { checktoken } = require('../auth/token_validation')
const { login,createUser, getUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const router = require('express').Router();

router.post('/login', login);
router.post('/', checktoken, createUser);
router.get('/', checktoken, getUsers);
router.get('/:id', checktoken, getUserById);
router.patch('/:id', checktoken, updateUser);
router.delete('/:id', checktoken, deleteUser);
module.exports = router;