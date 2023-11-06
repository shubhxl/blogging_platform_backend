import express from 'express';
import session from 'express-session';
import authenticationRouter from './src/routes/authentication';
import blogRouter from './src/routes/blog';
// import userRouter from './src/routes/user';
// import subscriptionRouter from './src/routes/subscription';
// import paymentRouter from './src/routes/payment';
import {requireAuth} from './src/middleware/authMiddleware'
import config from 'config'
 
const app = express();
 
 
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
  session({
    secret: config.get('Database.host'),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, 
  })
);
 
 
const port = 5000;
 
 
 
app.use('/v1/auth', authenticationRouter);
app.use('/v1/blogs', requireAuth, blogRouter);
// app.use('/v1/users', requireAuth, userRouter);
// app.use('/v1/subscriptions', requireAuth, subscriptionRouter);
// app.use('/v1/payments', requireAuth, paymentRouter);
 
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});