import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const CustomFieldValidationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    console.log(errors);
    return new BadRequestException(errors);
  },
});
