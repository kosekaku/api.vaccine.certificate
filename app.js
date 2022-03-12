import express from 'express';
import cors from 'cors';
import apiRoutes from './api/v1/routes/routes';

const app = express();
const port = process.env.PORT || 5000;
// use builtin middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Custom middlewares for the app
app.use('/api/v1/', apiRoutes.router);

// generic error middleware function
app.use((req, res) => {
  const error = new Error('Page not found!');
  error.status = 404;
  return res.status(404).json({ status: error.status, message: error.message });
});

if (!module.parent) {
  app.listen(port, () => console.log(` App listening on port no: ${port}`));
}

export default app;
