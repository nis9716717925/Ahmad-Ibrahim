import { IsBoolean, IsDateString, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  serviceTypeId!: string;

  @IsString()
  templateId!: string;

  @IsString()
  organizationId!: string;

  @IsOptional()
  @IsString()
  facilityId?: string;

  @IsOptional()
  @IsString()
  auditorId?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsString()
  scheduledTime?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsBoolean()
  gpsRequired?: boolean;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsString()
  siteLocation?: string;

  @IsOptional()
  @IsString()
  status?: 'DRAFT' | 'SCHEDULED';
}

export class UpdateAuditDto {
  @IsOptional()
  @IsString()
  status?: 'DRAFT' | 'SCHEDULED' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'COMPLETED' | 'FOLLOW_UP';

  @IsOptional()
  @IsObject()
  responses?: unknown;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  maxScore?: number;
}
