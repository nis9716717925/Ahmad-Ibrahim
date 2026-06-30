import { IsOptional, IsString } from 'class-validator';

export class EnrollDto {
  @IsString()
  courseId!: string;

  @IsOptional()
  @IsString()
  organizationId?: string;
}
