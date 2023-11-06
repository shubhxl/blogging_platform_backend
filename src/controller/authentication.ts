import { Request, Response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import format from 'pg-format';
import { db } from '../utils/database';
import jwt from 'jsonwebtoken';

declare module 'express-session' {
  interface Session {
    user: {
      id: number;
      email: string;
    } | null;
  }
} 
export const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);    
    await db.none(
      'INSERT INTO users (first_name, last_name, email, hash, salt) VALUES ($1, $2, $3, $4, $5)',
      [first_name, last_name, email, hashedPass, salt]
    );
    res.status(200).send({success: true, message: 'User added'})
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).send('Internal Server Error');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await db.oneOrNone(
      'SELECT * FROM users WHERE email = $1',
      email
    );

    if (!user || !bcrypt.compareSync(password, user.hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.account_id,
      email: user.email,
    };
    res.status(200).json({ 'message': true });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error: ', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
};

