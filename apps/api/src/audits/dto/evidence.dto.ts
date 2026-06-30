import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEvidenceDto {
  @IsString()
  type!: 'photo' | 'video' | 'document' | 'voice' | 'note';

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
