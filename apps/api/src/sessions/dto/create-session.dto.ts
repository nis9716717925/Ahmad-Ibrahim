import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  courseId?: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  scheduledAt!: string;

  @IsOptional()
  @IsNumber()
  @Min(15)
  durationMin?: number;
}
