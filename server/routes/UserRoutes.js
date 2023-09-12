import express from 'express'
import { loginController, registerController, testController } from '../controllers/UserController.js';
import { isAdmin, requireSignIn } from '../middleware/UserMiddleware.js';

const router = express.Router();

// REGISTER || POST 

router.post('/register',registerController)

// LOGIN || POST

router.post('/login',loginController)

// Test Routes

router.get('/test', requireSignIn, isAdmin, testController)

export default router;