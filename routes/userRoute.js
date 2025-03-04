import express from 'express'
import { register, login, logout, otherUsers, authUser } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/otherusers').get(isAuthenticated, otherUsers);
router.route('/').get(isAuthenticated, authUser);

export default router;