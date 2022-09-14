import express from 'express'
import userRoutes from '../routes/user.routes'
import morgan from 'morgan'
import cors from 'cors'

const app = express();

// settings
app.set('port', process.env.PORT || 9000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.use(userRoutes);

export default app;