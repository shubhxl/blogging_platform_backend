import { Request, Response } from 'express';

export const requireAuth = (req: Request, res: Response, next: any) => {
    if (req.session.id) {
        req.body.userId = req.session.user?.id;
        req.body.email = req.session.user?.email;
        next();
    } else {
        res.redirect('/login');
    }
}