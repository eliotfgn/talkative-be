import { Router } from 'express';
import AuthService from '../services/auth/auth.service';

const router: Router = Router();
const authService: AuthService = new AuthService();

router.post('/register', authService.register);
router.post('/login', authService.login);

export default router;
