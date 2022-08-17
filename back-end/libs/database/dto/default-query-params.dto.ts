import { IsNumberString, IsOptional } from 'class-validator';

export class DefaultQueryParams {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
