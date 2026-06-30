import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateExamDto {
  @IsString()
  courseId!: string;

  @IsString()
  title!: string;

  @IsArray()
  questions!: unknown[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  passingScore?: number;

  @IsOptional()
  @IsNumber()
  timeLimitMin?: number;
}
