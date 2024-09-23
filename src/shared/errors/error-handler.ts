import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

import { Request, Response } from 'express';

@Catch()
export class CustomErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const message = error?.getResponse
      ? error?.getResponse().message
      : error.message;

    console.log(message);

    if (error instanceof NotFoundException) {
      const message = error.message.includes(request.path)
        ? 'Route not found'
        : 'Not Found';
      return response.status(404).json({
        status: 404,
        message: message,
        path: request.path,
        timestamp: new Date().toISOString(),
        error: error.message,
      });
    }

    if (error instanceof ForbiddenException) {
      const message = error.message;
      return response.status(403).json({
        status: 403,
        message: 'Unauthorized',
        path: request.path,
        timestamp: new Date().toISOString(),
        error: message,
      });
    }

    if (error instanceof BadRequestException) {
      if (typeof message === 'object') {
        const responseMsr = message.map((data: any) => {
          const errors = [];
          for (const key of Object.keys(data.constraints)) {
            errors.push(data.constraints[key]);
          }
          return {
            field: data.property,
            errors,
          };
        });

        return response.status(400).json({
          status: 400,
          message: 'Bad Request',
          path: request.path,
          timestamp: new Date().toISOString(),
          error: responseMsr,
        });
      }

      return response.status(400).json({
        status: 400,
        message: 'Bad Request',
        path: request.path,
        timestamp: new Date().toISOString(),
        error: message,
      });
    }

    if (error instanceof UnauthorizedException) {
      return response.status(401).json({
        status: 401,
        message: 'Unauthorized',
        path: request.path,
        timestamp: new Date().toISOString(),
        error: message,
      });
    }

    if (error instanceof ConflictException) {
      const message = error.message;
      return response.status(409).json({
        status: 409,
        message: 'Conflict',
        path: request.path,
        timestamp: new Date().toISOString(),
        error: message,
      });
    }

    if (error instanceof ThrottlerException) {
      const message = error.message;
      return response.status(429).json({
        status: 429,
        message: 'Too Many Request',
        path: request.path,
        timestamp: new Date().toISOString(),
        error: message.split(':')[1],
      });
    }

    return response.status(500).json({
      status: 500,
      message: 'Something went wrong',
      timestamp: new Date(Date.now()).toISOString(),
    });
  }
}
