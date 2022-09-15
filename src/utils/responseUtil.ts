import { Response } from 'express';
import { ISuccess, IError } from '../interfaces/response.interface';

export class ResponseUtil {
  success = ({ statusCode, message, data, res }: ISuccess): Response => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  };

  error = ({ statusCode, message, res }: IError): Response => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
    });
  };
}
