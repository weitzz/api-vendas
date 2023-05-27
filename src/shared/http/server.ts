import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import {errors} from 'celebrate';
import routes from '@shared/routes';
import ValidationError from '@shared/errors/ValidationError';
import '@shared/typeorm';
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if(error instanceof ValidationError){
      return response.status(error.statusCode).json({
        status:'error',
        message: error.message
      })
    }
    return response.status(500).json({
      status:'error',
      message: 'Internal server error'
    })

  },
);
app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
