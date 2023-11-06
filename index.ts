import express from 'express';
import session from 'express-session';
import authenticationRouter from './src/routes/authentication';
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



// Use the route files for each API type
app.use('/v1/auth', authenticationRouter);
// app.use('/api/users', userRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/payments', paymentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
