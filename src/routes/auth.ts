import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv'
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/login/failed', (req: Request, res: Response) => {
    res.status(401).json({
        message: 'Unauthorized user'
    })
})

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err: any, user: any) => {
        if (err) {
            return next(err);
        }
        const secretKey: string = env.SECRET ?? '';
        console.log(secretKey,"thanks")
        const token = jwt.sign({ email: user["_json"].email }, secretKey, {
            expiresIn: '3d'
        })
        res.cookie('hotel-jwtToken', token);
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        next()

    })(req, res, next);
});

export default router;