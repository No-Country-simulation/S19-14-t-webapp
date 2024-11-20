import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'sequelize';

@Catch(ValidationError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;

    const messages = exception.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: messages,
    });
  }
}
