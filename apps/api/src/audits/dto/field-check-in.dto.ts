import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FieldCheckInDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsNumber()
  accuracy?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  type?: 'CHECK_IN' | 'CHECK_OUT';
}
