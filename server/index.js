import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const port = process.env.PORT || 3000;

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());


app.use(routes);

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
    },
  });
});


// finally, let's start our server...
/* eslint-disable-next-line */
app.listen(port, () => console.log(`App Listening on port ${port}`));

export default app;
