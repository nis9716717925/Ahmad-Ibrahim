import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditStatus, CorrectiveActionStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { FieldCheckInDto } from './dto/field-check-in.dto';
import { ChecklistResponseValue } from './dto/corrective-action.dto';
import { CreateFindingDto, UpdateFindingDto } from './dto/finding.dto';
import { CreateEvidenceDto } from './dto/evidence.dto';

type ChecklistItem = { id: string; section: string; question: string; weight?: number };

@Injectable()
export class AuditsService {
  constructor(private prisma: PrismaService) {}

  getServiceTypes() {
    return this.prisma.serviceType.findMany({
      where: { isActive: true },
      include: { templates: { where: { isActive: true } } },
    });
  }

  async getDashboardStats(organizationId?: string) {
    const where = organizationId ? { organizationId } : {};
    const now = new Date();
    const audits = await this.prisma.audit.findMany({
      where,
      include: { correctiveActions: true, findings: true },
    });

    const overdue = audits.filter(
      (a) =>
        a.scheduledAt &&
        a.scheduledAt < now &&
        !['COMPLETED', 'FOLLOW_UP'].includes(a.status),
    ).length;

    const highRiskFindings = audits.reduce(
      (sum, a) => sum + (a.findings?.filter((f) => f.severity === 'HIGH' || f.severity === 'CRITICAL').length ?? 0),
      0,
    );

    const openCapa = audits.reduce(
      (sum, a) =>
        sum + (a.correctiveActions?.filter((c) => !['RESOLVED', 'VERIFIED'].includes(c.status)).length ?? 0),
      0,
    );

    const scored = audits.filter((a) => a.score != null && a.maxScore);
    const avgCompliance =
      scored.length > 0
        ? Math.round(scored.reduce((s, a) => s + ((a.score! / a.maxScore!) * 100), 0) / scored.length)
        : 0;

    return {
      total: audits.length,
      scheduled: audits.filter((a) => a.status === 'SCHEDULED' || a.status === 'DRAFT').length,
      inProgress: audits.filter((a) => a.status === 'IN_PROGRESS').length,
      completed: audits.filter((a) => a.status === 'COMPLETED').length,
      overdue,
      highRiskFindings,
      correctiveActions: openCapa,
      avgComplianceScore: avgCompliance,
    };
  }

  findAll(organizationId?: string, auditorId?: string, today?: boolean) {
    const where: Prisma.AuditWhereInput = {};
    if (organizationId) where.organizationId = organizationId;
    if (auditorId) where.auditorId = auditorId;
    if (today) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      where.scheduledAt = { gte: start, lte: end };
    }

    return this.prisma.audit.findMany({
      where: Object.keys(where).length ? where : undefined,
      include: {
        serviceType: true,
        organization: { select: { id: true, name: true } },
        facility: { select: { id: true, name: true } },
        auditor: { select: { id: true, firstName: true, lastName: true } },
        findings: { where: { status: 'OPEN' }, take: 3 },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const audit = await this.prisma.audit.findUnique({
      where: { id },
      include: {
        serviceType: true,
        template: true,
        organization: true,
        facility: true,
        auditor: { select: { id: true, firstName: true, lastName: true, email: true } },
        correctiveActions: { orderBy: { createdAt: 'desc' } },
        findings: { orderBy: { createdAt: 'desc' } },
        evidence: { orderBy: { createdAt: 'desc' } },
        timelineEvents: { orderBy: { createdAt: 'asc' } },
        fieldCheckIns: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!audit) throw new NotFoundException('Audit not found');
    return audit;
  }

  async create(dto: CreateAuditDto, createdById: string) {
    const count = await this.prisma.audit.count();
    const referenceNumber = `AUD-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
    const status = dto.status === 'SCHEDULED' ? AuditStatus.SCHEDULED : AuditStatus.DRAFT;

    const audit = await this.prisma.audit.create({
      data: {
        referenceNumber,
        serviceTypeId: dto.serviceTypeId,
        templateId: dto.templateId,
        organizationId: dto.organizationId,
        facilityId: dto.facilityId,
        auditorId: dto.auditorId,
        createdById,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        scheduledTime: dto.scheduledTime,
        priority: dto.priority ?? 'MEDIUM',
        industry: dto.industry,
        gpsRequired: dto.gpsRequired ?? false,
        contactPerson: dto.contactPerson,
        siteLocation: dto.siteLocation,
        status,
      },
      include: { serviceType: true, organization: true, facility: true },
    });

    await this.addTimelineEvent(audit.id, 'Audit Scheduled', `${audit.referenceNumber} scheduled`);
    return audit;
  }

  async update(id: string, dto: UpdateAuditDto) {
    const existing = await this.findOne(id);

    const data: Prisma.AuditUpdateInput = {};
    if (dto.status) data.status = dto.status;
    if (dto.responses !== undefined) data.responses = dto.responses as Prisma.InputJsonValue;
    if (dto.notes !== undefined) data.notes = dto.notes;
    if (dto.score !== undefined) data.score = dto.score;
    if (dto.maxScore !== undefined) data.maxScore = dto.maxScore;
    if (dto.status === AuditStatus.IN_PROGRESS && !existing.startedAt) {
      data.startedAt = new Date();
      await this.addTimelineEvent(id, 'Inspection Started', 'Auditor began on-site inspection');
    }
    if (dto.status === AuditStatus.UNDER_REVIEW) {
      await this.addTimelineEvent(id, 'Manager Review', 'Audit submitted for manager review');
    }
    if (dto.status === AuditStatus.COMPLETED) {
      data.completedAt = new Date();
      await this.addTimelineEvent(id, 'Client Approved', 'Audit approved and completed');
    }

    return this.prisma.audit.update({
      where: { id },
      data,
      include: { serviceType: true, correctiveActions: true, findings: true },
    });
  }

  async recordCheckIn(auditId: string, userId: string, dto: FieldCheckInDto) {
    await this.findOne(auditId);
    const type = dto.type ?? 'CHECK_IN';
    const checkIn = await this.prisma.fieldCheckIn.create({
      data: {
        auditId,
        userId,
        type,
        latitude: dto.latitude,
        longitude: dto.longitude,
        accuracy: dto.accuracy,
        note: dto.note,
      },
    });

    const eventLabel = type === 'CHECK_OUT' ? 'Auditor Checked Out (GPS)' : 'Auditor Checked In (GPS)';
    await this.addTimelineEvent(
      auditId,
      eventLabel,
      `${dto.latitude.toFixed(5)}, ${dto.longitude.toFixed(5)}`,
    );

    if (type === 'CHECK_IN') {
      await this.prisma.audit.update({
        where: { id: auditId },
        data: { status: AuditStatus.IN_PROGRESS, startedAt: new Date() },
      });
    }

    return checkIn;
  }

  private isPass(answer: ChecklistResponseValue['answer']): boolean {
    return answer === 'pass' || answer === true || answer === 1;
  }

  private isFail(answer: ChecklistResponseValue['answer']): boolean {
    return answer === 'fail' || answer === false || answer === 0;
  }

  computeSectionScores(items: ChecklistItem[], responses: Record<string, ChecklistResponseValue>) {
    const sections: Record<string, { earned: number; max: number }> = {};

    for (const item of items) {
      const section = item.section;
      if (!sections[section]) sections[section] = { earned: 0, max: 0 };
      const weight = item.weight ?? 10;
      sections[section].max += weight;
      const resp = responses[item.id];
      if (!resp) continue;

      if (resp.score != null) {
        sections[section].earned += (resp.score / 10) * weight;
      } else if (this.isPass(resp.answer)) {
        sections[section].earned += weight;
      } else if (resp.answer === 'na') {
        sections[section].max -= weight;
      }
    }

    const result: Record<string, number> = {};
    let totalEarned = 0;
    let totalMax = 0;

    for (const [section, { earned, max }] of Object.entries(sections)) {
      if (max > 0) {
        result[section] = Math.round((earned / max) * 100);
        totalEarned += earned;
        totalMax += max;
      }
    }

    result['Overall'] = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
    return result;
  }

  async submitResponses(id: string, responses: Record<string, ChecklistResponseValue>) {
    const audit = await this.findOne(id);
    const items = audit.template.items as ChecklistItem[];
    let score = 0;
    let maxScore = 0;

    for (const item of items) {
      const weight = item.weight ?? 10;
      maxScore += weight;
      const resp = responses[item.id];
      if (!resp) continue;

      if (resp.score != null) {
        score += (resp.score / 10) * weight;
      } else if (this.isPass(resp.answer)) {
        score += weight;
      } else if (resp.answer === 'na') {
        maxScore -= weight;
      }

      if (this.isFail(resp.answer) || (resp.riskLevel === 'HIGH' && this.isFail(resp.answer))) {
        const existing = await this.prisma.auditFinding.findFirst({
          where: { auditId: id, checklistItemId: item.id },
        });
        if (!existing) {
          await this.prisma.auditFinding.create({
            data: {
              auditId: id,
              title: `Non-conformity: ${item.question}`,
              description: resp.notes,
              severity: resp.riskLevel ?? 'MEDIUM',
              checklistItemId: item.id,
              status: 'OPEN',
              aiSuggestion: `Review ${item.section} procedures and implement corrective controls for: ${item.question}.`,
            },
          });
        }
      }
    }

    const sectionScores = this.computeSectionScores(items, responses);

    const updated = await this.prisma.audit.update({
      where: { id },
      data: {
        responses: responses as Prisma.InputJsonValue,
        sectionScores: sectionScores as Prisma.InputJsonValue,
        score,
        maxScore,
        status: AuditStatus.UNDER_REVIEW,
      },
      include: { template: true, correctiveActions: true, findings: true },
    });

    await this.addTimelineEvent(id, 'Checklist Completed', `Overall score: ${sectionScores['Overall']}%`);
    return updated;
  }

  async createFinding(auditId: string, dto: CreateFindingDto) {
    await this.findOne(auditId);
    return this.prisma.auditFinding.create({
      data: {
        auditId,
        title: dto.title,
        description: dto.description,
        severity: dto.severity ?? 'MEDIUM',
        responsiblePerson: dto.responsiblePerson,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        checklistItemId: dto.checklistItemId,
        aiSuggestion: `Investigate root cause for "${dto.title}" and assign corrective action with verification timeline.`,
      },
    });
  }

  async updateFinding(findingId: string, dto: UpdateFindingDto) {
    const finding = await this.prisma.auditFinding.findUnique({ where: { id: findingId } });
    if (!finding) throw new NotFoundException('Finding not found');
    return this.prisma.auditFinding.update({
      where: { id: findingId },
      data: {
        status: dto.status,
        severity: dto.severity,
        responsiblePerson: dto.responsiblePerson,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async addEvidence(auditId: string, dto: CreateEvidenceDto) {
    await this.findOne(auditId);
    const evidence = await this.prisma.auditEvidence.create({
      data: {
        auditId,
        type: dto.type,
        fileName: dto.fileName,
        fileUrl: dto.fileUrl,
        note: dto.note,
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });

    if (dto.type === 'photo' || dto.type === 'video') {
      await this.addTimelineEvent(auditId, 'Photos Captured', dto.fileName ?? 'Evidence uploaded');
    }

    return evidence;
  }

  async addTimelineEvent(auditId: string, event: string, detail?: string) {
    return this.prisma.auditTimelineEvent.create({
      data: { auditId, event, detail },
    });
  }

  createCorrectiveAction(auditId: string, dto: {
    title: string;
    description?: string;
    rootCause?: string;
    correctiveAction?: string;
    preventiveAction?: string;
    assignedTo?: string;
    severity?: string;
    aiSuggestion?: string;
    dueDate?: string;
  }) {
    return this.prisma.correctiveAction.create({
      data: {
        auditId,
        title: dto.title,
        description: dto.description,
        rootCause: dto.rootCause,
        correctiveAction: dto.correctiveAction,
        preventiveAction: dto.preventiveAction,
        assignedTo: dto.assignedTo,
        severity: dto.severity,
        aiSuggestion: dto.aiSuggestion,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async updateCorrectiveAction(actionId: string, dto: {
    status?: CorrectiveActionStatus;
    rootCause?: string;
    correctiveAction?: string;
    preventiveAction?: string;
    assignedTo?: string;
    dueDate?: string;
  }) {
    const action = await this.prisma.correctiveAction.findUnique({ where: { id: actionId } });
    if (!action) throw new NotFoundException('Corrective action not found');
    return this.prisma.correctiveAction.update({
      where: { id: actionId },
      data: {
        status: dto.status,
        rootCause: dto.rootCause,
        correctiveAction: dto.correctiveAction,
        preventiveAction: dto.preventiveAction,
        assignedTo: dto.assignedTo,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        resolvedAt: dto.status && ['RESOLVED', 'VERIFIED'].includes(dto.status) ? new Date() : undefined,
      },
    });
  }

  async runAiAction(auditId: string, action: string) {
    const audit = await this.findOne(auditId);
    const items = (audit.template.items as ChecklistItem[]) ?? [];
    const responses = (audit.responses as Record<string, ChecklistResponseValue>) ?? {};
    const fails = items.filter((i) => {
      const r = responses[i.id];
      return r && this.isFail(r.answer);
    });

    let result = '';

    switch (action) {
      case 'summarize':
        result = `Audit ${audit.referenceNumber} for ${audit.organization.name}: ${fails.length} non-compliant items across ${[...new Set(items.map((i) => i.section))].length} sections. Overall compliance: ${(audit.sectionScores as Record<string, number>)?.['Overall'] ?? 'N/A'}%. Status: ${audit.status}.`;
        await this.prisma.audit.update({ where: { id: auditId }, data: { aiSummary: result } });
        await this.addTimelineEvent(auditId, 'AI Summary Generated', 'Audit summary created');
        break;

      case 'generate-capa':
        for (const item of fails.slice(0, 5)) {
          const exists = audit.correctiveActions?.some((c) => c.title.includes(item.question));
          if (!exists) {
            await this.createCorrectiveAction(auditId, {
              title: `CAPA: ${item.question}`,
              description: responses[item.id]?.notes,
              rootCause: `Failure identified during ${item.section} inspection`,
              correctiveAction: `Immediate remediation of ${item.question.toLowerCase()}`,
              preventiveAction: `Update SOP and schedule follow-up verification`,
              severity: responses[item.id]?.riskLevel ?? 'MEDIUM',
              aiSuggestion: 'Verify effectiveness within 30 days',
            });
          }
        }
        result = `Generated ${Math.min(fails.length, 5)} corrective action plans from audit findings.`;
        break;

      case 'suggest-actions':
        result = fails.length
          ? fails.map((f) => `• ${f.section}: ${f.question} — implement immediate corrective controls and staff retraining.`).join('\n')
          : 'No corrective actions needed — all items compliant.';
        break;

      case 'improve-notes':
        result = audit.notes
          ? `Enhanced notes: ${audit.notes}. Key observations documented with timestamps. Recommend attaching photographic evidence for all high-risk findings.`
          : 'No notes to improve. Consider adding executive summary and section-level observations.';
        break;

      case 'executive-summary':
        result = `EXECUTIVE SUMMARY\n\nClient: ${audit.organization.name}\nAudit: ${audit.referenceNumber}\nType: ${audit.serviceType.name}\nCompliance Score: ${(audit.sectionScores as Record<string, number>)?.['Overall'] ?? 'Pending'}%\n\nFindings: ${audit.findings?.length ?? 0} non-conformities identified.\nOpen CAPA: ${audit.correctiveActions?.filter((c) => c.status === 'OPEN').length ?? 0} actions pending.\n\nRecommendation: ${fails.length > 0 ? 'Schedule follow-up audit within 30 days.' : 'Maintain current compliance standards.'}`;
        break;

      case 'compare':
        const previous = await this.prisma.audit.findFirst({
          where: {
            organizationId: audit.organizationId,
            id: { not: auditId },
            status: 'COMPLETED',
          },
          orderBy: { completedAt: 'desc' },
        });
        if (previous) {
          const prevScore = previous.score && previous.maxScore ? Math.round((previous.score / previous.maxScore) * 100) : 0;
          const currScore = (audit.sectionScores as Record<string, number>)?.['Overall'] ?? 0;
          const delta = currScore - prevScore;
          result = `Compared with ${previous.referenceNumber}: Previous ${prevScore}% → Current ${currScore}% (${delta >= 0 ? '+' : ''}${delta}% change).`;
        } else {
          result = 'No previous completed audit found for comparison.';
        }
        break;

      default:
        result = 'Unknown AI action.';
    }

    return { action, result };
  }

  async generateReportData(auditId: string) {
    const audit = await this.findOne(auditId);
    return {
      referenceNumber: audit.referenceNumber,
      organization: audit.organization.name,
      facility: audit.facility?.name,
      serviceType: audit.serviceType.name,
      status: audit.status,
      score: audit.score,
      maxScore: audit.maxScore,
      sectionScores: audit.sectionScores,
      findings: audit.findings,
      correctiveActions: audit.correctiveActions,
      completedAt: audit.completedAt,
      aiSummary: audit.aiSummary,
    };
  }
}
