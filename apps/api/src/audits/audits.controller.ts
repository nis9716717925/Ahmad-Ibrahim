import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { JwtAuthGuard } from '../auth/guards';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { FieldCheckInDto } from './dto/field-check-in.dto';
import {
  CreateCorrectiveActionDto,
  SubmitResponsesDto,
  UpdateCorrectiveActionDto,
} from './dto/corrective-action.dto';
import { CreateFindingDto, UpdateFindingDto } from './dto/finding.dto';
import { CreateEvidenceDto } from './dto/evidence.dto';

@Controller('audits')
@UseGuards(JwtAuthGuard)
export class AuditsController {
  constructor(private auditsService: AuditsService) {}

  @Get('dashboard')
  getDashboard(@Query('organizationId') organizationId?: string) {
    return this.auditsService.getDashboardStats(organizationId);
  }

  @Get('service-types')
  getServiceTypes() {
    return this.auditsService.getServiceTypes();
  }

  @Get()
  findAll(
    @Query('organizationId') organizationId?: string,
    @Query('auditorId') auditorId?: string,
    @Query('today') today?: string,
  ) {
    return this.auditsService.findAll(organizationId, auditorId, today === 'true');
  }

  @Get(':id/report')
  getReport(@Param('id') id: string) {
    return this.auditsService.generateReportData(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAuditDto, @Request() req: { user: { sub: string } }) {
    return this.auditsService.create(dto, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAuditDto) {
    return this.auditsService.update(id, dto);
  }

  @Post(':id/responses')
  submitResponses(@Param('id') id: string, @Body() dto: SubmitResponsesDto) {
    return this.auditsService.submitResponses(id, dto.responses);
  }

  @Post(':id/check-in')
  checkIn(
    @Param('id') id: string,
    @Body() dto: FieldCheckInDto,
    @Request() req: { user: { sub: string } },
  ) {
    return this.auditsService.recordCheckIn(id, req.user.sub, dto);
  }

  @Post(':id/findings')
  createFinding(@Param('id') id: string, @Body() dto: CreateFindingDto) {
    return this.auditsService.createFinding(id, dto);
  }

  @Patch('findings/:findingId')
  updateFinding(@Param('findingId') findingId: string, @Body() dto: UpdateFindingDto) {
    return this.auditsService.updateFinding(findingId, dto);
  }

  @Post(':id/evidence')
  addEvidence(@Param('id') id: string, @Body() dto: CreateEvidenceDto) {
    return this.auditsService.addEvidence(id, dto);
  }

  @Post(':id/ai/:action')
  runAi(@Param('id') id: string, @Param('action') action: string) {
    return this.auditsService.runAiAction(id, action);
  }

  @Post(':id/corrective-actions')
  createCorrectiveAction(@Param('id') id: string, @Body() dto: CreateCorrectiveActionDto) {
    return this.auditsService.createCorrectiveAction(id, dto);
  }

  @Patch('corrective-actions/:actionId')
  updateCorrectiveAction(@Param('actionId') actionId: string, @Body() dto: UpdateCorrectiveActionDto) {
    return this.auditsService.updateCorrectiveAction(actionId, dto);
  }
}
