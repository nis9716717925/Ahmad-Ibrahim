import { IsDateString, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrectiveActionStatus } from '@prisma/client';

export type ChecklistResponseValue = {
  answer: 'pass' | 'fail' | 'na' | boolean | number;
  score?: number;
  riskLevel?: string;
  notes?: string;
  photos?: string[];
  documents?: string[];
};

export class SubmitResponsesDto {
  @IsObject()
  responses!: Record<string, ChecklistResponseValue>;
}

export class CreateCorrectiveActionDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  rootCause?: string;

  @IsOptional()
  @IsString()
  correctiveAction?: string;

  @IsOptional()
  @IsString()
  preventiveAction?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  severity?: string;

  @IsOptional()
  @IsString()
  aiSuggestion?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

export class UpdateCorrectiveActionDto {
  @IsOptional()
  @IsEnum(CorrectiveActionStatus)
  status?: CorrectiveActionStatus;

  @IsOptional()
  @IsString()
  rootCause?: string;

  @IsOptional()
  @IsString()
  correctiveAction?: string;

  @IsOptional()
  @IsString()
  preventiveAction?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
